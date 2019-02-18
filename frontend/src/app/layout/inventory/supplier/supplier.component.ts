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
  listsupplier: Supplier[];
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
    this.getSupplier();
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

  openUpdateModal(content: NgbModalRef, id_supplier) {
    this.isCreate = false;
    this.selectedId = id_supplier;
    this.SupplierService.findById(id_supplier)
    .subscribe((data:any) => {
            this.form.updateData(data.supplier);
            this.openModal(content);
        });
  }
	
	getSupplier() {
    this.startLoading();
    this.SupplierService.getList()
		.subscribe((listusers:any) => {
        this.stopLoading();
        this.listsupplier = listusers.supplier
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
      this.addsupplier(dto);
    } else {
      this.updatesupplier(dto);
    }
    this.modal.dismissAll();
    }

  addsupplier(supplier): void {
    console.log(supplier);
    this.SupplierService.add(supplier)
    .subscribe((data:any) => {
            this.stopLoading();
            this.getSupplier();
            this.notifierService.notify('success', 'A new supplier has been successfully added');
    }), err => {
      this.stopLoading();
    };
    }

  updatesupplier(supplier) {
    this.SupplierService.update(supplier)
    .subscribe((data:any) => {
            this.stopLoading();
            this.getSupplier();
            this.notifierService.notify('success', 'supplier information has been successfully updated');
    }), err => {
      this.stopLoading();
    };
    }

  deletesupplier() {
      this.SupplierService.deleteSupplier(this.selectedId)
      .subscribe((data:any) => {
              this.getSupplier();
              this.notifierService.notify('success', 'A supplier has been successfully deleted');
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
