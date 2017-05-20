import {Device} from '../model/device';
import {Injectable} from '@angular/core';

import {DEVICES} from '../resources/mock-device';
import {DeviceParserService} from './device-parser.service';

import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';


@Injectable()
export class DeviceService {

    constructor(private parserService: DeviceParserService, private http:Http) {
    }

    //TODO Sie können dieses Service benutzen, um alle REST-Funktionen für die Smart-Devices zu implementieren

    getDevices(): Promise<Device[]> {
        //TODO Lesen Sie die Geräte über die REST-Schnittstelle aus
        /*
         * Verwenden Sie das DeviceParserService um die via REST ausgelesenen Geräte umzuwandeln.
         * Das Service ist dabei bereits vollständig implementiert und kann wie unten demonstriert eingesetzt werden.
         */
        let ds:Device[] = [];
        let headers: Headers = new Headers();
        headers.append("authorization", "Bearer " + localStorage.getItem("token"));

         this.http.get("http://localhost:8081/deviceList",headers).forEach((resp)=>{
            let a = resp.json();
            for(let i=0; i<a.length;i++){
                ds[i] = this.parserService.parseDevice(a[i]);
                console.log(ds[i]);
            }
         });

        return Promise.resolve(ds).then(devices => {
            for (let i = 0; i < devices.length; i++) {
                devices[i] = this.parserService.parseDevice(devices[i]);
            }
            return devices;
        });
    }

    getDevice(id: string): Promise<Device> {
        return this.getDevices()
            .then(devices => devices.find(device => device.id === id));
    }

}
