import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../table/table.component';
import { BookingService } from './booking.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  addBookingForm:FormGroup;
  testTableData: Array<object>;
  testTableColumns: Array<object>;
  bookingData: Array<object>;
  isBookingDataReady: boolean;
  modalOptions: object;
  showNavigationConfirmBox: Boolean;
  addBookingModalOptions: object;
  showAddBokingModal: Boolean;
  addBookingFormSubmitted: Boolean;
  showDeleteModal: Boolean;
  deleteBookingModalOptions: object;

  constructor(private bookingService: BookingService) { 
    this.isBookingDataReady = false;
    this.showAddBokingModal = false;
    this.addBookingFormSubmitted = false;
    this.showDeleteModal = false;
    this.modalOptions = {
        modalId: 'confirmation-modal',
        modalClass: 'confirmation-modal',
        hideRejectBtn: true
    }
    this.addBookingModalOptions = {
      modalId: 'add-booking-modal',
      modalClass: 'confirmation-modal',
      hideRejectBtn: true
    }

    this.deleteBookingModalOptions = {
      modalId: 'delete-booking-modal',
      modalClass: 'confirmation-modal',
      hideRejectBtn: true
    }
  }

  ngOnInit() {
    this.bookingService.getData('/bookings').then( (response) => {
      this.bookingData = response;
      this.isBookingDataReady = true;
    });

    this.addBookingForm = new FormGroup({
      booking: new FormControl('', Validators.required),
      licenseNumber: new FormControl ('', Validators.required),
      personName: new FormControl('', Validators.required),
     
    });

    this.testTableColumns = [
      {
        header: "Booking Time",
        field: "booking"
      },
      // {
      //   header: "Description",
      //   field: "locDesc"
      // },
      {
        header: "Lisence Number",
        field: "licenseNumber"
      },
      {
        header: "Customer Name",
        field: "personName"
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
            action: 'edit'
          }
        ]
      }
    ]
  }

  tableBtnClicked(tableItem) {
   // this.showNavigationConfirmBox = true;
    if(tableItem.btnConfig.action === 'edit') {
      this.bookingService.getBooking('/bookings/' + tableItem.clickedItem.bookingID ).then( (response) => {
        debugger
        this.updateFormValues('booking', response.booking);
        this.updateFormValues('licenseNumber', response.licenseNumber);
        this.updateFormValues('personName', response.personName);

        this.showAddBokingModal = true;
      })
    } else if (tableItem.btnConfig.action === 'delete') {
       this.showDeleteModal= true;
    }
    
    
  }
  get f() { return this.addBookingForm.controls; }

  openAddLOcationModal() {
      this.addBookingForm.reset();
      this.showAddBokingModal = true;
  }

  discardAddLocation() {
      this.showAddBokingModal = false;
      this.addBookingFormSubmitted = false;
  }

  confirmAddLocation() {
    debugger
    this.addBookingFormSubmitted = true;

    // stop here if form is invalid
    if (this.addBookingForm.invalid) {
        return;
    }
    this.bookingService.addBooking(this.addBookingForm.value).then( () => {
      this.showAddBokingModal = false;
      // this.toastMessage = "Successfully Added"
      //     this.showToast = true;
      //     setTimeout( () => {
      //       this.showToast = false;
      //     }, 3000)
    });
  }

  updateFormValues(controlName: string, value) {
    (<FormControl>this.addBookingForm.controls[controlName])
        .setValue(value);
  }

  confirmDeleteLocation() {

  }

  discardDeleteLocation() {
    this.showDeleteModal = false;
  }

}

