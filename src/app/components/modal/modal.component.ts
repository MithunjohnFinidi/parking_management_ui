import { Component, OnInit, Input, Output, AfterViewInit, ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {


  ngOnInit() {
  }
  @Input() modalConfig: any;
    @Input() private toggleModalVisibility: boolean;
    @Output() modalShown: EventEmitter<boolean> = new EventEmitter();
    @Output() modalShownSoon: EventEmitter<boolean> = new EventEmitter();
    @Output() modalConfirmClicked: EventEmitter<boolean> = new EventEmitter();
    @Output() modalHidden: EventEmitter<boolean> = new EventEmitter();
    @Output() modalCancelClicked: EventEmitter<boolean> = new EventEmitter();
    constructor(private elementRef: ElementRef) {
    }
    ngOnChanges(changes: SimpleChanges) {
        debugger
        if (changes['toggleModalVisibility'] && !changes['toggleModalVisibility'].currentValue) {
            this.hideModal();
        }
        if (changes['toggleModalVisibility'] && changes['toggleModalVisibility'].currentValue) {
            this.showModal();
        }
    }

    ngAfterViewInit() {
        $(this.elementRef.nativeElement.querySelector('div#' + this.modalConfig.modalId)).on('show.bs.modal', () => {
            this.modalShownSoon.emit(true);
            setTimeout(()=>{
                this.modalShown.emit(true);
            }, 10)
        }).on('hidden.bs.modal', () => {
            this.modalHidden.emit(true);
        });
    }

    confirmBtnClicked() {
        this.modalConfirmClicked.emit(true);
    }
    cancelBtnClicked() {
        this.modalCancelClicked.emit(true);
    }
    showModal() {
        debugger
        $('#' + this.modalConfig.modalId).modal('show');
    }
    hideModal() {
        $('#' + this.modalConfig.modalId).modal('hide');
    }

}
