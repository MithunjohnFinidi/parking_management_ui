import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() tableData: Array<object>;
  @Input() tableColumns: Array<object>;

  constructor() { }

  ngOnInit() {
    
  }

}
