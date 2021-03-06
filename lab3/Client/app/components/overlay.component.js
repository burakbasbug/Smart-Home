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
var overview_component_1 = require("./overview.component");
var device_service_1 = require("../services/device.service");
var http_1 = require('@angular/http');
var OverlayComponent = (function () {
    function OverlayComponent(deviceService, http) {
        this.deviceService = deviceService;
        this.http = http;
        this.overviewComponent = null;
        this.selected_type = null;
        this.controlUnitType_selected = null;
        this.addError = false;
        this.createError = false;
    }
    OverlayComponent.prototype.ngOnInit = function () {
        this.device_types = ["Beleuchtung", "Heizkörperthermostat", "Rollladen", "Überwachungskamera", "Webcam"];
        this.controlUnit_types = ["Ein/Auschalter", "Diskrete Werte", "Kontinuierlicher Wert"];
        this.selected_type = this.device_types[0];
        this.controlUnitType_selected = this.controlUnit_types[0];
    };
    OverlayComponent.prototype.doClose = function () {
        if (this.overviewComponent != null) {
            this.overviewComponent.closeAddDeviceWindow();
        }
    };
    /**
     * Liest die Daten des neuen Gerätes aus der Form aus und leitet diese an die REST-Schnittstelle weiter
     * @param form
     */
    OverlayComponent.prototype.onSubmit = function (form) {
        this.overviewComponent.closeAddDeviceWindow();
        //TODO Lesen Sie Daten aus der Form aus und übertragen Sie diese an Ihre REST-Schnittstelle
        var authHeader = new http_1.Headers();
        authHeader.append('authorization', 'Bearer ' + localStorage.getItem('token'));
        var newDevice = {
            description: form.value['typename'],
            displayname: form.value['displayname'],
            image_alt: form.value['elementname'],
            type: form.value['type-input'],
            control_units: [{
                    name: form.value['elementtype-input'],
                    type: "",
                    values: [""]
                }]
        };
        if (form.value['elementtype-input'] == 'Ein/Ausschalter') {
            newDevice.control_units[0].type = 'boolean';
            newDevice.control_units[0].values = [''];
        }
        else if (form.value['elementtype-input'] == 'Diskrete Werte') {
            newDevice.control_units[0].type = 'enum';
            newDevice.control_units[0].values = form.value['discrete-values'];
        }
        else if (form.value['elementtype-input'] == 'Kontinuierlicher Wert') {
            newDevice.control_units[0].type = 'continuous';
        }
        this.http.post('http://localhost:8081/addDevice', newDevice, { headers: authHeader }).toPromise().then(function (res) { return console.log(res); });
        form.reset();
    };
    OverlayComponent.prototype.isSelected = function (type) {
        return type == this.device_types[0];
    };
    OverlayComponent.prototype.isBooleanSelected = function () {
        return this.controlUnitType_selected === this.controlUnit_types[0];
    };
    OverlayComponent.prototype.isEnumSelected = function () {
        return this.controlUnitType_selected === this.controlUnit_types[1];
    };
    OverlayComponent.prototype.isContinuousSelected = function () {
        return this.controlUnitType_selected === this.controlUnit_types[2];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', overview_component_1.OverviewComponent)
    ], OverlayComponent.prototype, "overviewComponent", void 0);
    OverlayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-overlay',
            templateUrl: '../views/overlay.component.html'
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService, http_1.Http])
    ], OverlayComponent);
    return OverlayComponent;
}());
exports.OverlayComponent = OverlayComponent;
//# sourceMappingURL=overlay.component.js.map