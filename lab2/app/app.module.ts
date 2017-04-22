import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './components/app.component';
import { RouterModule } from '@angular/router';

import { DeviceService} from './services/device.service';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { OptionsComponent } from './components/options/options.component';
import { AppRoutingModule } from './app-routing.module';

import {DoughnutChartDemoComponent} from './components/details/doughnut-chart-demo.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,DetailsComponent,LoginComponent,OverviewComponent,OptionsComponent,DoughnutChartDemoComponent
  ],
  providers: [ DeviceService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
