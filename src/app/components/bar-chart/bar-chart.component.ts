import { Component, OnInit, ElementRef, Input, SimpleChanges} from '@angular/core';
import * as Chart from 'chart.js';
import { $ } from 'protractor';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() chartData: Array<object>;
  canvas: any;
  barChart: any;
  ctx: any;
  labelArray: Array<number> = [];
  valueArray: Array<number> = [];
  noDataFound: boolean = false;

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
          if(this.barChart) {
            this.barChart.clear();
            this.barChart.destroy();
            this.barChart = undefined;
          }
          
        }
        
    }
  }

  processData(chartData) {
    this.labelArray = [];
    this.valueArray = [];
    if(chartData.length!=0) {
      chartData.forEach( (item) => {
        this.labelArray.push(item.label)
        this.valueArray.push(item.value)
      })
      return true
    } else {
      return false
    }
    
  }

  ngAfterViewInit() {
    this.canvas = this.elementRef.nativeElement.querySelector('.bar-chart');
    this.ctx = this.canvas.getContext('2d');
    // this.drawChart();
  }

  drawChart() {
    if (!!this.barChart) {
      this.barChart.clear();
      this.barChart.destroy();
    }

    this.barChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
          labels: this.labelArray,
          datasets: [{
              label: '# of vehicles',
              data: this.valueArray,
              backgroundColor: [
                  'red',
                  'orange',
                  'yellow',
                  'green',
                  'blue'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              xAxes: [{
                gridLines: {
                    display:false
                }
              }],
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  },
                  gridLines: {
                    display:false
                  } 
              }]
          }
          
      }
    })
  }

}
