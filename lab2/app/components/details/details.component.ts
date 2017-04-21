import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Params }   from '@angular/router';
import { DeviceService } from '../../services/device.service';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { Device } from '../../model/device';
import {ControlType} from '../../model/controlType';


@Component({
    moduleId: module.id,
    selector: 'details2', // !!Da in HTML5 ein <details> element gibt!!
    templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit{
    device: Device;
    //@Input() value : Number;

    constructor(private bigDeviceService: DeviceService, private route: ActivatedRoute, private location: Location){}

    ngOnInit(): void{
        this.route.params
        .switchMap((params: Params) => this.bigDeviceService.getDevice(params['id']))
        .subscribe(suppliedDevice => this.device = suppliedDevice );
    }

    /*setValue(): void {
        console.log(this.value);
    }*/

}