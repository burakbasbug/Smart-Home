import { Component,Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'polar-area-chart',
    templateUrl: './polar-area-chart.component.html'
})
export class PolarAreaChartComponent {

    // PolarArea
    public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
    public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
    public polarAreaLegend: boolean = true;
    public polarAreaChartType: string = 'polarArea';
}
