import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { NgbModalRef, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';

@Component({
	selector: 'resources-setup',
	templateUrl: './resources.component.html',
	styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  modalOptions: NgbModalOptions;
  closeResult: string;
  isCreate: boolean;
  constructor(private notifierService: NotifierService,
    private modal: NgbModal,
  ) {
    this.modalOptions = {
      backdrop: 'static',
      size: 'md',
      windowClass: 'custom-modal',
      backdropClass: 'custom-modal',
    };
  }
  openModal(content) {
    this.modal.open(content,this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }
  openCreateModal(content: NgbModalRef) {
    this.isCreate = true;
    // this.form.new();
    this.openModal(content);
  }

  openUpdateModal(content: NgbModalRef, resourceID) {
    this.isCreate = false;
    // .subscribe((data:any) => {
    //         this.form.updateData(data.category);
    //         this.openModal(content);
    //     });
  }
	ngOnInit() {

	}

}
