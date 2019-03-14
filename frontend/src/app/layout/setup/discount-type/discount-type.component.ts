import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
@Component({
	selector: 'discount-type',
	templateUrl: './discount-type.component.html',
	styleUrls: ['./discount-type.component.scss']
})
export class DiscountTypeComponent implements OnInit {
  modalOptions: NgbModalOptions;
  closeResult: string;
  constructor(private notifierService: NotifierService,
    private modal: NgbModal,
  ) {
    this.modalOptions = {
      backdrop: 'static',
      size: 'md',
    };
  }
  openModal(content) {
    this.modal.open(content,this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

	ngOnInit() {

	}

}
