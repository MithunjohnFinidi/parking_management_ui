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

  constructor(private dashboardService: DashboardService) { 
    this.daysArray = ["Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  }

  ngOnInit() {
    this.dashboardService.getData('/locations').then( (response) => {
      debugger
      this.locationsArray = response;
      this.selectedDay = 'Monday';
      this.selectedLocation = response[0]
      this.getStatistics();
    })
    
    
  }

  getStatistics() {
    this.dashboardService.getData( `/dashboard/statistics/${this.selectedDay}/${this.selectedLocation['locID']}`).then( (response) => {
      debugger
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
