import { Component, OnInit, Input, ElementRef, SimpleChanges } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() chartData: Array<object>;
  canvas: any;
  pieChart: any;
  ctx: any;
  noDataFound: boolean = false;
  pieChartData: Array<string>;

  constructor(private elementRef: ElementRef) { 
    this.noDataFound = false;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData'] && changes['chartData'].currentValue) {
        if(this.processData(changes['chartData'].currentValue)) {
          this.noDataFound = false;
          this.drawChart();
        } else {
          this.noDataFound = true;
          if(this.pieChart) {
            this.pieChart.clear();
            this.pieChart.destroy();
            this.pieChart = undefined;
          }
          
        }
        
    } else {
      this.noDataFound = true;
      if(this.pieChart) {
        this.pieChart.clear();
        this.pieChart.destroy();
        this.pieChart = undefined;
      }
    }
  }

  processData(chartData) {
    if(chartData) {
      this.pieChartData = [chartData, 100 - chartData];
      return true
    } else {
      return false
    }
    
  }

  ngAfterViewInit() {
    this.canvas = this.elementRef.nativeElement.querySelector('.pie-chart');
    this.ctx = this.canvas.getContext('2d');
    // this.drawChart();
  }

  drawChart() {
    if (!!this.pieChart) {
      this.pieChart.clear();
      this.pieChart.destroy();
    }

    this.pieChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
          labels: ['Occupied(%)', 'Available(%)'],
          datasets: [{
              label: '# of Votes',
              data: this.pieChartData,
              backgroundColor: [
                  'red',
                  'orange'
              ],
              borderWidth: 1
          }]
      }
    })
  }

}
