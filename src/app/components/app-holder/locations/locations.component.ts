import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../table/table.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  testTableData: Array<object>;
  testTableColumns: Array<object>;

  constructor() { }

  ngOnInit() {

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
        header: "Name",
        field: "name"
      },
      {
        header: "Age",
        field: "age"
      },
      {
        header: "Place",
        field: "place"
      },
      {
        header: "College",
        field: "college"
      },
      {
        header: "Car",
        field: "car"
      },
      {
        header: "Test",
        field: "test"
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

}
