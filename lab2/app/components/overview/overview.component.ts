import { Component,OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../model/device';


@Component({
    moduleId: module.id,
    selector: 'overview',
    templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit{
    devices : Device[];

    constructor(private bigDeviceService: DeviceService){}
    
    ngOnInit() {
        this.bigDeviceService.getDevices().then(x => this.devices = x);
    }
}