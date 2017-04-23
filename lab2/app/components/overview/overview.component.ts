import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../../services/device.service';
import {Device} from '../../model/device';
import {ControlType} from "../../model/controlType";


@Component({
    moduleId: module.id,
    selector: 'overview',
    templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
    devices: Device[];

    constructor(private bigDeviceService: DeviceService) {
    }

    ngOnInit() {
        this.bigDeviceService.getDevices().then(x => this.devices = x);
    }

    ngAfterViewInit() {
        for (var i = 0; i < this.devices.length; i++) {
            for (var j = 0; j < this.devices[i].control_units.length; j++) {
                if (this.devices[i].control_units[j].primary) {
                    if (this.devices[i].control_units[j].type == ControlType.continuous) {
                        //draw_image(id, src, min, max, current, values)
                        this.devices[i].draw_image(this.devices[i].id, this.devices[i].image, this.devices[i].control_units[j].min, this.devices[i].control_units[j].max, this.devices[i].control_units[j].current, null);
                    } else if (this.devices[i].control_units[j].type == ControlType.enum) {
                        this.devices[i].draw_image(this.devices[i].id, this.devices[i].image, null, null, this.devices[i].control_units[j].current, this.devices[i].control_units[j].values);
                    } else if (this.devices[i].control_units[j].type == ControlType.boolean) {
                        this.devices[i].draw_image(this.devices[i].id, this.devices[i].image, null, null, this.devices[i].control_units[j].current, null);
                    }
                }
            }
        }
    }
}