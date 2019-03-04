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
  mobile: any = {};
  telephone: any = {};
  second_address: any = {};
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
  _eSupplier: any;

	constructor(
    private notifierService: NotifierService,
    private modal: NgbModal,
    private SupplierService: SupplierService,
    private InventoryService: InventoryService
	) {
    this.form = new Supplier();
    this.modalOptions = {
      backdrop: 'static',
      size: 'lg',
      windowClass: 'container-modal',
      backdropClass: 'container-modal',
    };
    // this.listsupplier = [];
	}

	ngOnInit() {
    this.getSupplier();
    this.getProduct();
    this.second_address.country = "empty";
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

  openUpdateModal(content: NgbModalRef, id_supplier, _eSupplier) {

    this.isCreate = false;
    this._eSupplier = _eSupplier;
    this.selectedId = id_supplier;
    // this.form = id_supplier
    // this.openModal(content);
    this.SupplierService.findById(id_supplier)
    .subscribe((data:any) => {
      console.log(data);
            this.form.updateData(data.supplier);
            this.mobile = data.supplier.mobilenumber_supplier;
            this.telephone = data.supplier.telephone_supplier;
            this.openModal(content);
        });
  }

	getSupplier() {
    this.startLoading();
    this.SupplierService.getList()
		.subscribe(listusers => {
        this.stopLoading();

        //this.mobile = this.form.mobileNumber;
        //this.telephone = this.form.telephoneNumber;
        this._listSup = listusers;
        this.display = this._listSup.supplier.length;
        this.listsupplier = this._listSup.supplier;
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
    if(this.postal_address){
      supplier.second_address = "";
    } else {
      supplier.second_address = JSON.stringify(this.second_address);
    }
    supplier.mobilenumber_supplier = this.mobile.internationalNumber;
    supplier.telephone_supplier = this.telephone.internationalNumber;
    console.log(supplier);
    this.SupplierService.add(supplier)
    .subscribe((data:any) => {

      //this.apps = this.form.second_address;
      this.stopLoading();
      this.getSupplier();
      this.notifierService.notify('success', 'A new supplier has been successfully added');
    }), err => {
      this.stopLoading();
    };
    }

  updatesupplier(supplier) {
    supplier.mobilenumber_supplier = this.mobile.internationalNumber;
    supplier.telephone_supplier = this.telephone.internationalNumber;
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
    if(confirm("Are you sure to delete "+ name)){
      this.SupplierService.deleteSupplier(this.selectedId)
      .subscribe((data:any) => {
              this.getSupplier();
              this.notifierService.notify('success', 'A supplier has been successfully deleted');
          });
      this.modal.dismissAll();
    }
  }

  searchSupplier(event) {
    const query = {name_supplier: event.target.value};
    this.SupplierService.searchSupplier(query).subscribe((list: any) => {
      this.listsupplier = list.supplier.map(Supplier.toModel);
    });
  }

  reloadList(event) {
    if(event){
      this.getSupplier();
    }
  }

  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }

}
