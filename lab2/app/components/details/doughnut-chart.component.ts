import { Component,Input } from '@angular/core';
import {Device} from '../../model/device';

@Component({
  moduleId: module.id,
  selector: 'doughnut-chart',
  templateUrl: './doughnut-chart.component.html'
})
export class DoughnutChartComponent{
  // Doughnut
  public doughnutChartLabels: string[] = ['Aus','An'];
  public doughnutChartData: number[] = [0,0];
  public doughnutChartType: string = 'doughnut';
  @Input() d : Device;
}