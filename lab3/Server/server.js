/*jslint node: true */
/*jslint esversion: 6*/
/*jslint eqeqeq: true */

var express = require('express');
var app = express();
var fs = require("fs");
var expressWs = require('express-ws')(app);
var http = require('http');

var simulation = require('./simulation.js');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var uuid = require('uuid');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// globale Variablen
var valid_username;
var valid_password;

var server_start_date;
var server_start_time;
var failed_logins = 0;

var devices; //Array von Devices als JSON-Objekte

var connectedClientsJWT = [];
var privateKey = 'OURPRIVATEKEY';

//T_ODO Implementieren Sie hier Ihre REST-Schnittstelle
/* Ermöglichen Sie wie in der Angabe beschrieben folgende Funktionen:
 *  Abrufen aller Geräte als Liste
 *  Hinzufügen eines neuen Gerätes
 *  Löschen eines vorhandenen Gerätes
 *  Bearbeiten eines vorhandenen Gerätes (Verändern des Gerätezustandes und Anpassen des Anzeigenamens)
 *  Log-in und Log-out des Benutzers
 *  Ändern des Passworts
 *  Abrufen des Serverstatus (Startdatum, fehlgeschlagene Log-ins).
 *
 *  BITTE BEACHTEN!
 *      Verwenden Sie dabei passende Bezeichnungen für die einzelnen Funktionen.
 *      Achten Sie bei Ihrer Implementierung auch darauf, dass der Zugriff nur nach einem erfolgreichem Log-In erlaubt sein soll.
 *      Vergessen Sie auch nicht, dass jeder Client mit aktiver Verbindung über alle Aktionen via Websocket zu informieren ist.
 *      Bei der Anlage neuer Geräte wird eine neue ID benötigt. Verwenden Sie dafür eine uuid (https://www.npmjs.com/package/uuid, Bibliothek ist bereits eingebunden).
 */
app.get("/deviceList", function(req, res) {
    if(verifyJWT(req)) {
        res.status(200).json(devices);
    } else {
        res.status(200).json("invalid_jwt");
    }
});

app.post("/addDevice", function (req, res) {
    if(verifyJWT(req)) {
        var newDevice = req.body;
        var id = uuid();
        var device = {
            "id": id,
            "description": newDevice.description,
            "display_name": newDevice.displayname,
            "type": newDevice.type,
            "control_units": newDevice.control_units
        };
        devices.push(device);
        console.log("new device: " + newDevice.displayname);
        res.status(200).send("successful");
        refreshConnected();
    } else {
        res.status(200).json("invalid_jwt");
    }
});

app.post("/deleteDevice", function (req, res) {
    if(verifyJWT(req)) {
        console.log("delete id: " + req.body.id);
        var device;
        for(var i = 0; i < devices.length; i++) {
            if(devices[i].id === req.body.id) {
                device = devices[i];
            }
        }
        console.log("delete device: "+ device.display_name);
        devices.splice(devices.indexOf(device), 1);
        res.status(200).json("successful");
        refreshConnected();
    } else {
        res.status(200).json("invalid_jwt");
    }
});

app.post("/updateDeviceName", function (req, res) {
    if(verifyJWT(req)) {
        var device = devices.filter(function (el) {
            return el.id === req.body.id;
        });
        device.display_name = req.body.name;
        res.status(200).json("successful");
        refreshConnected();
    } else {
        res.status(200).json("invalid_jwt");
    }
});

app.post("/updateCurrent", function (req, res) {
    "use strict";
    //T_ODO Vervollständigen Sie diese Funktion, welche den aktuellen Wert eines Gerätes ändern soll
    /*
     * Damit die Daten korrekt in die Simulation übernommen werden können, verwenden Sie bitte die nachfolgende Funktion.
     *      simulation.updatedDeviceValue(device, control_unit, Number(new_value));
     * Diese Funktion verändert gleichzeitig auch den aktuellen Wert des Gerätes, Sie müssen diese daher nur mit den korrekten Werten aufrufen.
     */
    if(verifyJWT(req)) {
        var device = devices.filter(function (el) {
            return el.id === req.body.id;
        });
        var control_unit = device.control_units.filter(function (el) {
            return el.name === req.body.control_unit;
        });
        control_unit.current = Number(req.body.new_value);
        res.status(200);
        simulation.updatedDeviceValue(device, control_unit, Number(req.body.new_value));
        refreshConnected();
    } else {
        res.status(200).json("invalid_jwt");
    }
});

app.post("/login", function (req, res) {
    // read request data
    var user = req.body.username;
    var pwd = req.body.password;
    if (user === valid_username && pwd === valid_password) {
        console.log("login successful");
        var token = jwt.sign({"username": user, "password": pwd, "time": new Date()}, privateKey);
        connectedClientsJWT.push(token);
        res.status(200).json(token);
    } else {
        console.log("login failed: " + user + ", " + pwd);
        failed_logins++;
        res.status(401).json("invalid_login");
    }

});

app.post("/logout", function (req, res) {
    "use strict";
    if(verifyJWT(req)) {
        delete connectedClientsJWT[req.headers.authorization.split(" ")[1]];
        res.status(200).json("successful");
        console.log("logout successful");
    } else {
        res.status(200).json("invalid_jwt");

    }
});

app.post("/changePassword", function (req, res) {
    if(verifyJWT(req)) {
        var oldPwd = req.body.oldPassword;
        var newPwd = req.body.newPassword;
        var newPwdRep = req.body.repeatPassword;
        if(oldPwd !== valid_password) {
            res.status(200).json("invalid, old password incorrect");
        } else if(newPwd !== newPwdRep) {
            res.status(200).json("invalid, new passwords dont match");
        } else {
            valid_password = newPwd;
            var fileContent = "username: " + valid_username + "\npassword: " + valid_password;
            fs.writeFile("resources/login.config", fileContent, {encoding: 'utf-8'}, function (err) {
                if(!err) {
                    res.status(200).json("successful");
                } else {
                    res.status(500).json("error writing password to file: " + err);
                }
            });
        }
    } else {
        res.status(200).json("invalid_jwt");
    }
});

app.get("/getServerStatus", function (req, res) {
    if(verifyJWT(req)) {
        res.status(200);
        res.json({
            "username": valid_username,
            "startDate": server_start_date,
            "startTime": server_start_time,
            "attempts": failed_logins
        });
    } else {
        res.status(200).json("invalid_jwt");
    }
});

function verifyJWT(req) {
    if(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer"){
        var token = req.headers.authorization;
        token = token.split(" ")[1];
        try {
            //var decoded = jwt.verify(token, privateKey);
            //decoded.username === valid_username && decoded.password === valid_password &&
            if(connectedClientsJWT.indexOf(token) !== -1) {
                return true;
            }
        } catch(err) {
            console.log("jwt invalid");
        }
    }else{
        console.log("Bad authorization header");
        return false;
    }
}

function readUser() {
    "use strict";
    //T_ODO-fertig Lesen Sie die Benutzerdaten aus dem login.config File ein.
    fs.readFile("resources/login.config", {encoding: 'utf-8'}, function(err, data){
        if (!err) {
            valid_username = data.split('\n')[0].split(': ')[1];
            valid_username = valid_username.split('\r')[0];
            console.log("read username = " + valid_username);
            valid_password = data.split('\n')[1].split(': ')[1];
            console.log("read pwd = " + valid_password);
        } else {
            console.log('error reading login.config: ' + err);
        }
    });
}

function readDevices() {
    "use strict";
    //T_ODO-fertig Lesen Sie die Gerätedaten aus der devices.json Datei ein.
    /*
     * Damit die Simulation korrekt funktioniert, müssen Sie diese mit nachfolgender Funktion starten
     *      simulation.simulateSmartHome(devices.devices, refreshConnected);
     * Der zweite Parameter ist dabei eine callback-Funktion, welche zum Updaten aller verbundenen Clients dienen soll.
     */
    fs.readFile("resources/devices.json", {encoding: 'utf-8'}, function(err, data){
        if (!err) {
            devices = JSON.parse(data).devices;
            console.log(devices.length + ' devices read');
            simulation.simulateSmartHome(devices, refreshConnected);
        } else {
            console.log('error reading devices.json: ' + err);
        }
    });
}


function refreshConnected() {
    "use strict";
    //TODO Übermitteln Sie jedem verbundenen Client die aktuellen Gerätedaten über das Websocket
    /*
     * Jedem Client mit aktiver Verbindung zum Websocket sollen die aktuellen Daten der Geräte übermittelt werden.
     * Dabei soll jeder Client die aktuellen Werte aller Steuerungselemente von allen Geräte erhalten.
     * Stellen Sie jedoch auch sicher, dass nur Clients die eingeloggt sind entsprechende Daten erhalten.
     *
     * Bitte beachten Sie, dass diese Funktion von der Simulation genutzt wird um periodisch die simulierten Daten an alle Clients zu übertragen.
     */
    //console.log("refreshConnected")
}


var server = app.listen(8081, function () {
    "use strict";
    readUser();
    readDevices();

    var date = new Date();
    server_start_date = date.getDate() + "." + (date.getMonth()+1) + "." + (date.getFullYear());
    server_start_time = date.getHours() + ":" + date.getMinutes();

    var host = server.address().address;
    var port = server.address().port;
    console.log("Big Smart Home Server listening at http://%s:%s", host, port);
});

