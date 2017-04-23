import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'doughnut-chart',
  templateUrl: './doughnut-chart.component.html'
})
export class DoughnutChartComponent {
  // Doughnut
  public doughnutChartLabels:string[] = ['An', 'Aus'];
  public doughnutChartData:number[] = [350, 450];
  public doughnutChartType:string = 'doughnut';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}