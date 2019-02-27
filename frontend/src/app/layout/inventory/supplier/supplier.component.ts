import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Supplier } from './model/supplier'
import { NotifierService } from 'angular-notifier';
import { SupplierService } from './supplier.service';
import { Product } from '../product/model/product';
import { InventoryService } from '../inventory.service';
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})

export class SupplierComponent implements OnInit {
  loading: boolean;
  form: Supplier;
  postal_address = true;

  modalOptions: NgbModalOptions;
  public error = [];

	closeResult: string;
  listsupplier: Supplier[];
  _listSup: any = [];
  isCreate: boolean;
  colors: string[];
  selectedId: string;
  listproducts: any;
  _list: any;
  display: number;

	constructor(
  private notifierService: NotifierService,
  private modal: NgbModal,
  private SupplierService: SupplierService,
  private InventoryService: InventoryService
	) {
    this.form = new Supplier();
    this.modalOptions = {
      backdrop: 'static',
      size: 'lg'
    };
    // this.listsupplier = [];
	}

	ngOnInit() {
    this.getSupplier();
    this.getProduct();
  }

  getProduct(){
    this.InventoryService.getListProduct()
    .subscribe((prod:any) => {
      this.stopLoading();
      this.listproducts = prod.product;
      //console.log(this.listproducts);
    }, err =>{

    });
  }
  _supplier :any;
  getNumberproduct(supplier) {
    this._supplier = supplier;
    //id = this.
    //let product = this.listproducts.filter(s => s.id_category == id);
    this._list = this.listproducts.filter(s => s.id_supplier == this._supplier.id)
    //console.log(this._list);
    return this._list.length;

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
		.subscribe(listusers => {
        this.stopLoading();
        this._listSup = listusers;
        this.display = this._listSup.supplier.length;
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

  searchSupplier(event) {
    const query = {name_supplier: event.target.value};
    this.SupplierService.searchSupplier(query).subscribe((list: any) => {
      this.listsupplier = list.supplier.map(Supplier.toModel);
    });
  }

  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }

}
