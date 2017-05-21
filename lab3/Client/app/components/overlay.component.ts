import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {OverviewComponent} from "./overview.component";
import {DeviceService} from "../services/device.service";
import {Device} from "../model/device";
import {ControlUnit} from "../model/controlUnit";
import {ControlType} from "../model/controlType";
import {Http,Headers} from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'my-overlay',
  templateUrl: '../views/overlay.component.html'
})
export class OverlayComponent implements OnInit {

  @Input()
  overviewComponent: OverviewComponent = null;

  device_types: any;
  controlUnit_types: any;
  selected_type: string = null;
  controlUnitType_selected: string = null;

  addError: boolean = false;
  createError: boolean = false;

  constructor(private deviceService: DeviceService, private http:Http) {
  }


  ngOnInit(): void {
    this.device_types = ["Beleuchtung", "Heizkörperthermostat", "Rollladen", "Überwachungskamera", "Webcam"]
    this.controlUnit_types = ["Ein/Auschalter", "Diskrete Werte", "Kontinuierlicher Wert"];
    this.selected_type = this.device_types[0];
    this.controlUnitType_selected = this.controlUnit_types[0];
  }

  doClose(): void {
    if (this.overviewComponent != null) {
      this.overviewComponent.closeAddDeviceWindow();
    }
  }

  /**
   * Liest die Daten des neuen Gerätes aus der Form aus und leitet diese an die REST-Schnittstelle weiter
   * @param form
   */
  onSubmit(form: NgForm): void {
    this.overviewComponent.closeAddDeviceWindow();
    //TODO Lesen Sie Daten aus der Form aus und übertragen Sie diese an Ihre REST-Schnittstelle
    let authHeader = new Headers();
    authHeader.append('authorization', 'Bearer ' + localStorage.getItem('token'));

    let newDevice = {
      description: form.value['typename'],
      displayname: form.value['displayname'],
      image_alt: form.value['elementname'],
      type: form.value['type-input'],
      control_units: [{
        name: form.value['elementtype-input'],
        type: "",
        values: [""]
      }]
    }

    if(form.value['elementtype-input']==='Ein/Ausschalter'){
      newDevice.control_units[0].type = 'boolean';
      newDevice.control_units[0].values = [''];
    }else if(form.value['elementtype-input']==='Diskrete Werte'){
      newDevice.control_units[0].type = 'enum';
      newDevice.control_units[0].values = form.value['discrete-values'];
    }else if(form.value['elementtype-input']==='Kontinuierlicher Wert'){
      newDevice.control_units[0].type = 'continuous';
      //maximum-value, maximum-value
    }
    
    this.http.post('http://localhost:8081/addDevice',newDevice,{headers: authHeader}).toPromise().then(res => console.log(res));
    form.reset();
  }

  isSelected(type: string): boolean {
    return type == this.device_types[0];
  }

  isBooleanSelected(): boolean {
    return this.controlUnitType_selected === this.controlUnit_types[0];
  }

  isEnumSelected(): boolean {
    return this.controlUnitType_selected === this.controlUnit_types[1];
  }

  isContinuousSelected(): boolean {
    return this.controlUnitType_selected === this.controlUnit_types[2];
  }

}
