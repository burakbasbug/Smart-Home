import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Params }   from '@angular/router';
import { DeviceService } from '../../services/device.service';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { Device } from '../../model/device';
import {ControlType} from '../../model/controlType';
import { ChartsModule } from 'ng2-charts';
import {DoughnutChartDemoComponent} from './doughnut-chart-demo.component';


@Component({
    moduleId: module.id,
    selector: 'details2', // !!Da in HTML5 ein <details> element gibt!!
    templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit{
    device: Device;
    logText : string = "";

    constructor(private bigDeviceService: DeviceService, private route: ActivatedRoute, private location: Location){}

    ngOnInit(): void{
        this.route.params
        .switchMap((params: Params) => this.bigDeviceService.getDevice(params['id'])) //'id' -> object mapping
        .subscribe(suppliedDevice => this.device = suppliedDevice ); // 'device = object' assignment
    }

    switchState(newValue : boolean): void{
        let value : boolean  = this.device.control_units[0]['current']==1?true:false; //shorter alias as boolean
        if(value !== newValue){
            //value of device has changed
            let newState = value ? "An  -> Aus" : "Aus -> An";
            this.logText += this.getNowFormatted() + ": " + newState + "\n";
            this.device.control_units[0]['current'] = newValue ? 1 : 0;
        }
    }

    chooseState(newValue : string) : void{
        let values : String[] = this.device.control_units[0]['values'];
        let value : string = values[this.device.control_units[0]['current']].toString();
        if(value !== newValue){
            //value of device has changed
            let newState = value + " -> " + newValue;
            this.logText += this.getNowFormatted() + ": " + newState + "\n";
            this.device.control_units[0]['current'] = values.indexOf(newValue);
        }
    }
    
    setState(newValue : string) : void{
        let value : number = this.device.control_units[0]['current'];
        let newValueNumber : number = Number.parseFloat(newValue);
        if(value !== newValueNumber){
            //value of device has changed
            let newState = value + " -> " + newValueNumber;
            this.logText += this.getNowFormatted() + ": " + newState + "\n";
            this.device.control_units[0]['current'] = newValueNumber;
        }
    }
    
    private getNowFormatted() : string {
        let now  = new Date(Date.now());
        let currDate : string = now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear() + " " + now.getHours() + "." + now.getMinutes() + "." + now.getSeconds();
        return currDate;   
    }

}