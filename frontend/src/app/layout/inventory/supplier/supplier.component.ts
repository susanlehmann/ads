import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Supplier } from './model/supplier'
import { NotifierService } from 'angular-notifier';
import { SupplierService } from './supplier.service';
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})

export class SupplierComponent implements OnInit {
  loading: boolean;
  form: Supplier;

  modalOptions: NgbModalOptions;
  public error = [];

	closeResult: string;
  listusers: Supplier[];
  isCreate: boolean;
  colors: string[];
  selectedId: string;
  
	constructor(
  private notifierService: NotifierService,
  private modal: NgbModal,
  private SupplierService: SupplierService,
	) {
    this.form = new Supplier();
    this.modalOptions = {
      backdrop: 'static',
      size: 'lg'
    };
	}

	ngOnInit() {
    this.getUser();
  }
  
  openModal(content: NgbModalRef) {
    this.modal.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  openCreateModal(content: NgbModalRef) {
    this.isCreate = true;
    this.form.new();
    this.openModal(content);
  }

  openUpdateModal(content: NgbModalRef, userId) {
    this.isCreate = false;
    this.selectedId = userId;
    this.SupplierService.findById(userId)
    .subscribe((data:any) => {
            this.form.updateData(data.user);
            this.openModal(content);
        });
  }
	
	getUser() {
    this.startLoading();
    this.SupplierService.getList()
		.subscribe((listusers:any) => {
        this.stopLoading();
        this.listusers = listusers.user
        .map(Supplier.toModel)
        .sort((a, b) => {
          return a.id - b.id;
        });
		}, err => {
      this.stopLoading();
    });
	}
	
  onSubmit(): void {
    const dto = this.form.toDto();
    this.startLoading();
    if (this.isCreate) {
      this.addStaff(dto);
    } else {
      this.updateStaff(dto);
    }
    this.modal.dismissAll();
    }

  addStaff(staff): void {
    this.SupplierService.add(staff)
    .subscribe((data:any) => {
            this.stopLoading();
            this.getUser();
            this.notifierService.notify('success', 'A new Staff has been successfully added');
    }), err => {
      this.stopLoading();
    };
    }

  updateStaff(staff) {
    this.SupplierService.update(staff)
    .subscribe((data:any) => {
            this.stopLoading();
            this.getUser();
            this.notifierService.notify('success', 'Staff information has been successfully updated');
    }), err => {
      this.stopLoading();
    };
    }

  deleteStaff() {
      this.SupplierService.deleteStaff(this.selectedId)
      .subscribe((data:any) => {
              this.getUser();
              this.notifierService.notify('success', 'A Staff has been successfully deleted');
          });
    this.modal.dismissAll();
  }
  
  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }

}
