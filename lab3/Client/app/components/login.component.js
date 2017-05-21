"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var LoginComponent = (function () {
    function LoginComponent(router, http) {
        this.router = router;
        this.http = http;
        this.loginError = false;
    }
    LoginComponent.prototype.onSubmit = function (form) {
        //TODO-Fertig Überprüfen Sie die Login-Daten über die REST-Schnittstelle und leiten Sie den Benutzer bei Erfolg auf die Overview-Seite weiter
        var _this = this;
        this.http.post('http://localhost:8081/login', form.value)
            .subscribe(function (response) {
            try {
                var resp = response.json();
                console.log("LOGGED IN!");
                localStorage.setItem("token", resp);
                _this.router.navigate(['/overview']);
            }
            catch (e) {
                console.log("Unable to route : " + e);
            }
        }, function (err) { return console.log("Unexpected error: " + err); });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-login',
            templateUrl: '../views/login.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
/*



this.http.post('http://localhost:8081/login', form.value).forEach((r) => {

            try {
                let token = r.headers.getAll("token");
                console.log(token);
                //console.log("LOGGED IN! Token: " + token);
                //localStorage.setItem("token", token);
                this.router.navigate(['/overview']);
            } catch (e) {
                console.log("Unexpected header");
            }

        });


*/ 
//# sourceMappingURL=login.component.js.map