import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() tableData: Array<object>;
  @Input() tableColumns: Array<object>;
  @Output() btnClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }

  buttonClicked(btnConfig, clickedItem) {
    debugger
    this.btnClicked.emit( {
      btnConfig,
      clickedItem
    })
  }

}
