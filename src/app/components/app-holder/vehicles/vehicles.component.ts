import { Component, OnInit } from '@angular/core';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  testTableData: Array<object>;
  testTableColumns: Array<object>;
  vehicleData: Array<object>;
  isVehicleDataReady: boolean;
  modalOptions: object;
  showNavigationConfirmBox: Boolean;

  constructor(private vehicleService: VehicleService) { 
    this.isVehicleDataReady = false;
    this.modalOptions = {
        modalId: 'confirmation-modal',
        modalClass: 'confirmation-modal',
        hideRejectBtn: true
    }
  }
  ngOnInit() {
    this.vehicleService.getData('http://localhost:3000/vehicles').then( (response) => {
      this.vehicleData = response;
      this.isVehicleDataReady = true;
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
        header: "Lisence Number",
        field: "licenseNo"
      },
      // {
      //   header: "Description",
      //   field: "locDesc"
      // },
      {
        header: "Modal name",
        field: "model"
      },
      {
        header: "Customer Name",
        field: "ownerName"
      },
      {
       header: "Color",
       field: "color"
      },
      {
        header:"Coming data",
        field:"vehicleIn"
      },
      {
      header:"Going date",
      field:"vehicleOut"
      },
     {
     header:"Vehicle Status",
     field:"vehicleStatus"
     },
     {
       header:"Parking Charge",
       field:"parkingCharge"
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
      this.vehicleService.getVehicle('http://localhost:3000/vehicles/' + tableItem.clickedItem.locID ).then( (response) => {
        debugger
      })
    } else if (tableItem.btnConfig.action === 'delete') {
      
    }
    
    
  }

}
