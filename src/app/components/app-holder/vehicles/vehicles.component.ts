import { Component, OnInit } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


interface CurrentVehicleOutData {
  licenseNo: number,
  locName: string,
  parking_time: string,
  parking_charge: string
}

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})


export class VehiclesComponent implements OnInit {

  testTableColumns: Array<object>;
  vehicleData: Array<object>;
  isVehicleDataReady: boolean;
  vehicleOutModalOptions: object;
  showNavigationConfirmBox: Boolean;
  showVehicleOutModal: boolean;
  currentVehicleOutData: CurrentVehicleOutData;
  addVehicleModalOptions: object;
  showVehicleInModal: boolean;
  addVehicleForm: FormGroup;
  locationsData: Array<object>;
  addVehicleFormSubmitted: boolean;

  constructor(private vehicleService: VehicleService) { 
    this.isVehicleDataReady = false;
    this.showVehicleOutModal = false;
    this.showVehicleInModal = false;
    this.addVehicleFormSubmitted = false;
    this.currentVehicleOutData = {}
    this.vehicleOutModalOptions = {
        modalId: 'vehicle-out-modal',
        modalClass: 'confirmation-modal',
        hideRejectBtn: true
    }

    this.addVehicleModalOptions = {
      modalId: 'vehicle-in-modal',
      modalClass: 'confirmation-modal',
      hideRejectBtn: true
    }
  }
  ngOnInit() {

    


    this.addVehicleForm = new FormGroup({
      licenseNo: new FormControl('', Validators.required),
      locID: new FormControl ('', Validators.required),
      model: new FormControl('', Validators.required),
      ownerName: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required)
    });

    this.vehicleService.getData('/vehicles').then( (response) => {
      this.vehicleService.getData('/locations').then( (locationsArray) => {
        this.vehicleData = response;
        this.locationsData = locationsArray;
        this.vehicleData.map( (item) => {
            item['locDetails'] = locationsArray.find( (locationItem) => {
              return locationItem.locID === item['locID']
            })
            item['vehicleInDate'] = this.displayDateFormat(item['vehicleIn']);
            item['vehicleOutDate'] = item['vehicleIn'] === item['vehicleOut'] ? '-' : this.displayDateFormat(item['vehicleOut']);
            item['vehicleStatus'] = item['vehicleStatus'] === 1 ? 'In' : 'Out';
            item['parkingCharge'] = '$' + item['parkingCharge'];
        })
        this.vehicleData.map( (item) => {
          item['locName'] = locationsArray.find( (locationItem) => {
            if(locationItem.locID === item['locID']) {
              return locationItem
            }
          }).locName
      })
        this.isVehicleDataReady = true;
      })
    });

    
    

    this.testTableColumns = [
      {
        header: "Lisence Number",
        field: "licenseNo"
      },
      {
        header: "Location",
        field: "locName"
      },
      
      {
        header:"Coming data",
        field:"vehicleInDate"
      },
      {
      header:"Going date",
      field:"vehicleOutDate"
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
            icon: 'fas fa-edit',
            customClass: 'editBtn',
            action: 'edit'
          },
          {
            label: 'Delete',
            icon: 'fas fa-trash',
            customClass: 'deleteBtn',
            action: 'vehicleOut'
          }
        ]
      }
    ]
  }

  displayDateFormat(date) {
    let tempDate = new Date(date);
    return tempDate.toLocaleTimeString() + '\n'+ tempDate.toLocaleDateString();
  }

  tableBtnClicked(tableItem) {
    this.showNavigationConfirmBox = true;
    if(tableItem.btnConfig.action === 'edit') {
      this.vehicleService.getVehicle('http://localhost:3000/vehicles/' + tableItem.clickedItem.locID ).then( (response) => {
      })
    } else if (tableItem.btnConfig.action === 'vehicleOut') {
      
      let timeDiff = Math.ceil((new Date(tableItem.clickedItem.vehicleIn).getTime() - new Date().getTime())/(1000*60*60))  
      this.currentVehicleOutData = {
        'licenseNo': tableItem.clickedItem.licenseNo,
        'locName': tableItem.clickedItem.locName,
        'parking_time': timeDiff +'hours',
        'parking_charge': timeDiff * tableItem.clickedItem.locDetails.parkingCharge
      }
      this.showVehicleOutModal = true;
    }
    
  }

  cancelVehicleOutModal() {
    this.showVehicleOutModal = false;
  }

  openVehicleInModal() {
    this.showVehicleInModal = true;
  }

  discardAddVehicle() {
    this.showVehicleInModal = false;
  }

  confirmAddVehicle() {
    this.addVehicleFormSubmitted = true;

    // stop here if form is invalid
    if (this.addVehicleForm.invalid) {
        return;
    }
    let formValue = this.addVehicleForm.value;
    let locationObj = {
      licenseNo: formValue.licenseNo,
      locID: parseInt(formValue.locID), 
      model: formValue.model,
      ownerName: formValue.ownerName,
      color: formValue.color,
      vehicleIn: new Date(),
      vehicleOut: new Date(),
      vehicleStatus: 1,
      parkingCharge: 0
    }
    debugger
    this.vehicleService.addVehicle(locationObj).then( () => {
      this.showVehicleInModal = false;
      // this.toastMessage = "Successfully Added"
      //     this.showToast = true;
      //     setTimeout( () => {
      //       this.showToast = false;
      //     }, 3000)
    });
  }

  get f() { return this.addVehicleForm.controls; }

  confirmAction() {

  }

  discardAction() {

  }

}
