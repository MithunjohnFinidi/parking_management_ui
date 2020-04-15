import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../table/table.component';
import { LocationsService } from './locations.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  addLocationForm: FormGroup;
  testTableData: Array<object>;
  testTableColumns: Array<object>;
  locationsData: Array<object>;
  isLocationDataReady: boolean;
  modalOptions: object;
  showNavigationConfirmBox: Boolean;
  addLocationModalOptions: object;
  showAddLocationModal: Boolean;
  addLocationFormSubmitted: Boolean;
  showDeleteModal: Boolean;
  deleteLocationModalOptions: object;

  constructor(private locationsService: LocationsService) { 
    this.isLocationDataReady = false;
    this.showAddLocationModal = false;
    this.addLocationFormSubmitted = false;
    this.showDeleteModal = false;
    this.modalOptions = {
        modalId: 'confirmation-modal',
        modalClass: 'confirmation-modal',
        hideRejectBtn: true
    }

    this.addLocationModalOptions = {
      modalId: 'add-location-modal',
      modalClass: 'confirmation-modal',
      hideRejectBtn: true
    }

    this.deleteLocationModalOptions = {
      modalId: 'delete-location-modal',
      modalClass: 'confirmation-modal',
      hideRejectBtn: true
    }
  }

  ngOnInit() {
    this.locationsService.getData('/locations').then( (response) => {
      this.locationsData = response;
      this.isLocationDataReady = true;
    });

    this.addLocationForm = new FormGroup({
      locName: new FormControl('', Validators.required),
      locDesc: new FormControl ('', Validators.required),
      numOfSlots: new FormControl('', Validators.required),
      numOfDisabledSlots: new FormControl('', Validators.required),
      numOfReserved: new FormControl('', Validators.required),
      speedLimit: new FormControl('', Validators.required),
      locStatus: new FormControl('', Validators.required),
      availableSlots: new FormControl('', Validators.required),
      parkingCharge: new FormControl('', Validators.required),
      // engine: new FormControl('', Validators.required),
      // lastName: ['', Validators.required],  
      // email: new FormControl('', [Validators.required, Validators.email])
    });
    
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
            icon: 'fas fa-edit',
            customClass: 'editBtn',
            action: 'edit'
          },
          {
            label: 'Delete',
            icon: 'fas fa-trash',
            customClass: 'deleteBtn',
            action: 'delete'
          }
        ]
      }
    ]
  }

  tableBtnClicked(tableItem) {
    // this.showNavigationConfirmBox = true;
    if(tableItem.btnConfig.action === 'edit') {
      this.locationsService.getALocation('/locations/' + tableItem.clickedItem.locID ).then( (response) => {
        debugger
        this.updateFormValues('locName', response.locName);
        this.updateFormValues('locDesc', response.locDesc);
        this.updateFormValues('numOfSlots', response.numOfSlots);
        this.updateFormValues('numOfDisabledSlots', response.numOfDisabledSlots);
        this.updateFormValues('numOfReserved', response.numOfReserved);
        this.updateFormValues('speedLimit', response.speedLimit);
        this.updateFormValues('locStatus', response.locStatus);
        this.updateFormValues('availableSlots', response.availableSlots);
        this.updateFormValues('parkingCharge', response.parkingCharge);

        this.showAddLocationModal = true;
      })
    } else if (tableItem.btnConfig.action === 'delete') {
      this.showDeleteModal = true;
    }
  }

  get f() { return this.addLocationForm.controls; }

  openAddLOcationModal() {
      this.addLocationForm.reset();
      this.showAddLocationModal = true;
  }

  discardAddLocation() {
      this.showAddLocationModal = false;
      this.addLocationFormSubmitted = false;
  }

  confirmAddLocation() {
    debugger
    this.addLocationFormSubmitted = true;

    // stop here if form is invalid
    if (this.addLocationForm.invalid) {
        return;
    }
    this.locationsService.addLOcation(this.addLocationForm.value).then( () => {
      this.showAddLocationModal = false;
      // this.toastMessage = "Successfully Added"
      //     this.showToast = true;
      //     setTimeout( () => {
      //       this.showToast = false;
      //     }, 3000)
    });
  }

  updateFormValues(controlName: string, value) {
    (<FormControl>this.addLocationForm.controls[controlName])
        .setValue(value);
  }

  confirmDeleteLocation() {

  }

  discardDeleteLocation() {
    this.showDeleteModal = false;
  }

  confirmAction() {

  }

  discardAction() {
    
  }

}
