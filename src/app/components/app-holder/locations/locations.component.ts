import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../table/table.component';
import { LocationsService } from './locations.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  testTableData: Array<object>;
  testTableColumns: Array<object>;
  locationsData: Array<object>;
  isLocationDataReady: boolean;
  modalOptions: object;
  showNavigationConfirmBox: Boolean;

  constructor(private locationsService: LocationsService) { 
    this.isLocationDataReady = false;
    this.modalOptions = {
        modalId: 'confirmation-modal',
        modalClass: 'confirmation-modal',
        hideRejectBtn: true
    }
  }

  ngOnInit() {
    this.locationsService.getData('http://localhost:3000/locations').then( (response) => {
      this.locationsData = response;
      this.isLocationDataReady = true;
    });
    this.testTableData = [
      {
        name: "mithun",
        age: 25,
        place: "asd",
        college: "asd",
        car: "asd",
        test: "asd"
      },
      {
        name: "nitin",
        age: 24,
        place: "asd",
        college: "asd",
        car: "asd",
        test: "asd"
      },
      {
        name: "mithun",
        age: 25,
        place: "asd",
        college: "asd",
        car: "asd",
        test: "asd"
      },
      {
        name: "nitin",
        age: 24,
        place: "asd",
        college: "asd",
        car: "asd",
        test: "asd"
      },
      {
        name: "mithun",
        age: 25,
        place: "asd",
        college: "asd",
        car: "asd",
        test: "asd"
      },
      {
        name: "nitin",
        age: 24,
        place: "asd",
        college: "asd",
        car: "asd",
        test: "asd"
      }
    ]

    this.testTableColumns = [
      {
        header: "Location",
        field: "locName"
      },
      // {
      //   header: "Description",
      //   field: "locDesc"
      // },
      {
        header: "Total slots",
        field: "numOfSlots"
      },
      {
        header: "Disabled slots",
        field: "numOfDisabledSlots"
      },
      {
        header: "Reserved slots",
        field: "numOfReserved"
      },
      {
        header: "Speed limit",
        field: "speedLimit"
      },
      {
        header: "Status",
        field: "locStatus"
      },
      {
        header: "Avaliable slots",
        field: "availableSlots"
      },
      {
        header: "Parking Charge",
        field: "parkingCharge"
      },
      {
        styleClass: 'button',
        buttons: [
          {
            label: 'Edit',
            icon: 'fas fa-pencil-alt',
            customClass: 'editBtn',
            action: 'edit'
          },
          {
            label: 'Delete',
            icon: 'fas fa-pencil-alt',
            customClass: 'deleteBtn',
            action: 'edit'
          }
        ]
      }
    ]
  }

  tableBtnClicked(tableItem) {
    this.showNavigationConfirmBox = true;
    if(tableItem.btnConfig.action === 'edit') {
      this.locationsService.getALocation('http://localhost:3000/locations/' + tableItem.clickedItem.locID ).then( (response) => {
        debugger
      })
    } else if (tableItem.btnConfig.action === 'delete') {
      
    }
    
    
  }

}
