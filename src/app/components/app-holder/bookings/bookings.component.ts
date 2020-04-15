import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../table/table.component';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  testTableData: Array<object>;
  testTableColumns: Array<object>;
  bookingData: Array<object>;
  isBookingDataReady: boolean;
  modalOptions: object;
  showNavigationConfirmBox: Boolean;

  constructor(private bookingService: BookingService) { 
    this.isBookingDataReady = false;
    this.modalOptions = {
        modalId: 'confirmation-modal',
        modalClass: 'confirmation-modal',
        hideRejectBtn: true
    }
  }

  ngOnInit() {
    this.bookingService.getData('http://localhost:3000/bookings').then( (response) => {
      this.bookingData = response;
      this.isBookingDataReady = true;
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
      this.bookingService.getBooking('http://localhost:3000/bookings/' + tableItem.clickedItem.locID ).then( (response) => {
        debugger
      })
    } else if (tableItem.btnConfig.action === 'delete') {
      
    }
    
    
  }

  confirmAction() {

  }

  discardAction() {
    
  }

}

