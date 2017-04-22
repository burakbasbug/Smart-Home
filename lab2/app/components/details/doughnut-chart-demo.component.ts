import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'doughnut-chart-demo',
  templateUrl: './doughnut-chart-demo.component.html'
})
export class DoughnutChartDemoComponent {
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
//http://valor-software.com/ng2-charts/
