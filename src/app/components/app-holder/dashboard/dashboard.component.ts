import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  locationsArray: Array<object>;
  selectedLocation: object;
  daysArray: Array<string>;
  selectedDay: string;
  statArray: Array<object> = [];

  constructor(private dashboardService: DashboardService) { 
    this.daysArray = ["Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  }

  ngOnInit() {
    this.dashboardService.getData('/locations').then( (response) => {
      this.locationsArray = response;
      this.selectedDay = 'Monday';
      this.selectedLocation = response[0]
      this.getStatistics();
    })
    
    
  }

  getStatistics() {
    this.dashboardService.getData( `/dashboard/statistics/${this.selectedDay}/${this.selectedLocation['locID']}`).then( (response) => {
      this.statArray = [];
      response.map( (item) => {
        let tempTime = new Date(item.time);
        item.time = parseInt(tempTime.toLocaleTimeString().split(":")[0]);
      })

      for(let i=0; i<24; i++) {
        response.forEach( (item)=> {
          if(item.time === i) {
            this.statArray[i] = {
              label: item.time,
              value: item.count
            };
          } else {
            if(!this.statArray[i]) {
              this.statArray[i] = {
                label: i,
                value: 0
              }
            }
          }
        })
      }
      this.statArray = [...this.statArray]
    })
  }

  locationChanged(newLocation) {
    this.selectedLocation = newLocation;
    this.getStatistics();
  }

  dayChanged(newDay) {
    this.selectedDay = newDay;
    this.getStatistics();
  }

}
