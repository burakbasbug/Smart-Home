import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DeviceService} from '../../services/device.service';
import {Device} from '../../model/device';
import {ControlType} from "../../model/controlType";


@Component({
    moduleId: module.id,
    selector: 'overview',
    templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit, AfterViewInit {
    devices: Device[];
    promise: Promise<Device[]>;

    constructor(private bigDeviceService: DeviceService) {
    }

    ngOnInit() {
        this.promise = this.bigDeviceService.getDevices();
        this.promise.then(x => this.devices = x);
    }

    ngAfterViewInit() {
        this.promise.then(function (list) {
            list.forEach(function (device) {
                device.control_units.forEach(function (control_unit) {
                    if (control_unit.primary) {
                        if(control_unit.type == ControlType.continuous) { // min, max, current
                            device.draw_image(device.id, device.image, control_unit.min, control_unit.max, control_unit.current, null);
                        } else if (control_unit.type == ControlType.enum) { // current, values
                            device.draw_image(device.id, device.image, null, null, control_unit.current, control_unit.values);
                        } else if (control_unit.type == ControlType.boolean) { // current
                            device.draw_image(device.id, device.image, null, null, control_unit.current, null);
                        }
                    }
                });
            });
        }).catch(function (e) {
            alert(e);
        });
    }
}