import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SupplierService } from '../../supplier/supplier.service';
import { CategoryService } from '../../category/category.service';
import { NotifierService } from 'angular-notifier';
import { LocationsService } from '../../../../shared/services/location.service';
import { InventoryService } from '../../inventory.service';
import { NgbModalOptions, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  @ViewChild('product') _prod: NgbModalRef;
  @ViewChild('totalAmount') _totalAmount: ElementRef;
  listsuppliers: any = [];
  _supplier: any;
  suppliers: any;
  location: any=[];
	numberList: number;
  check: any;
  step: number;
  selectedsupplier: any;
  modalOptions: NgbModalOptions;
  closeResult: string;
  listcategories: any;
  listpro: any;
  _category: any;
  _listproducts:any;
  listproducts: any;
  items = [];
  _prod_selected: any = [];
  orderTotal: any;
  constructor(private notifierService: NotifierService,
    private locationService: LocationsService,
    private categoryService: CategoryService,
    private inventoryService:InventoryService,
    private modal: NgbModal,
    private SupplierService: SupplierService,
  ) {}
  ngOnInit() {
    this.getSupplier();
    this.loadLocation();
    this.getCategory();
    this.getProduct();
    this.step = 1;
  }
// get item for view
  getSupplier() {
    this.SupplierService.getList()
      .subscribe((reponse: any) => {
        this.listsuppliers = reponse.supplier
        this.check = this.listsuppliers.length;
      }, err => {
      });
  }
  loadLocation() {
		var user = JSON.parse(localStorage.getItem('user'));
		this.locationService.listLocation(user.id).subscribe(
			success => {
				this.location = success.location;
        this.numberList = success.location.length;
        // console.log(this.location);
        // console.log(this.numberList);
			},
			error => {
				console.log(error);
			}
		);
  }
  getCategory() {
    this.categoryService.getList()
      .subscribe((cate: any) => {
        this.listcategories = cate.category
      }, err => {

      });
  }
  getProduct() {
    this.inventoryService.getListProduct()
      .subscribe((prod: any) => {
        this.listproducts = prod.product;
      }, err => {

      });
  }
  //end
  // Step to forward at new-order
  gostep2(supplier) {
    this.step =  2;
    this.selectedsupplier = supplier;
  }

  gostep3(supplier,local){
    // console.log(typeof(local));
    this.step = 3;
    this.selectedsupplier = supplier;
    if(local.length > 0){
      this.location = local[0];
    } else {
      this.location = local;
    }

  }
  // end step forward
  openProduct(content: NgbModalRef) {
    this.modal.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  openProduct1(content, category) {
    this._category = category;
    this._listproducts = this.listproducts.filter(s => s.id_category == this._category.id);
    this.listpro = this._listproducts.length;
    this.modal.dismissAll();
    this.openModal(this._prod);
    this.openProduct(content);
    // console.log(this.items.length)
    //console.log(this.listproducts);
    // console.log(this._listproducts);
  }
  openModalNoCategory(content, category) {
    this._category = category;
    //console.log(this.listproducts);
    this._listproducts = this.listproducts.filter(s => s.id_category == 0);
    this.modal.dismissAll();
    this.openModal(this._prod);
    this.openProduct(content);
  }

  openModal(content: NgbModalRef) {
    this.modal.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
    this.check = this.listsuppliers.length;
  }
  openProducts(content){
    this.modal.dismissAll();
    this.openModal(this._prod);
    this.openProduct(content);
  }
  //end modal
  //math for items product
  deleteProd(prod) {
    this.items = this.items.filter(i => i != prod);
  }

  selectedX(prods) {
    this._prod_selected.push(prods);
    const copy = Object.assign({}, prods)
    this.items.push(copy);
    console.table(this.items);
    this.modal.dismissAll();
    this.openModal(this._prod);
  }
  sum() {
    this.orderTotal = this.items.reduce((acc, cur) => {
      return acc + cur.quantity * cur.supplyprice_product;
    }, 0)
  }
  //end
}
