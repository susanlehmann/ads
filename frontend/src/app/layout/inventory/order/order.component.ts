import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from './order.service';
import { Order } from './model/order';
import { Supplier } from '../supplier/model/supplier';
import { SupplierService} from '../supplier/supplier.service';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/model/category';
import { Product } from '../product/model/product';
import { InventoryService } from '../inventory.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @ViewChild('product') _prod: NgbModalRef;
  @ViewChild('totalAmount') _totalAmount: ElementRef;
  closeResult: string;
  isCreate: boolean;
  loading: boolean;
  form: Order;
  public error = [];
  listorders: Order[];
  selectedId: string;
  modalOptions: NgbModalOptions;
  listsuppliers: any = [];
  //listproducts = [{name: 'deha'},{name: 'asaka'}]
  categoriess = [{name: 'demo'},{name: 'sad'}]
  order = [{name: 'kimkim', updatetime: '19 Feb 2019, 06:54'}]
  listcategories: any = [];
  _supplier: any;
  _category: any;
  listproducts: any;
  _listproducts: any;
  _products: any;
  number_prod: number;
  _prod_selected: any = [];
  _total: any;
  arr_info_product: any = [];

  items = [];
  orderTotal;

  constructor(private notifierService: NotifierService,
    private modal: NgbModal,
    private OrderService: OrderService,
    private SupplierService: SupplierService,
    private CategoryService: CategoryService,
    private InventoryService: InventoryService,
  ) {
    this.form = new Order();
    this.modalOptions = {
      backdrop: 'static',
      size: 'lg'
    };

  }

  openProduct(content: NgbModalRef) {
    this.modal.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  openModal(content: NgbModalRef) {
    this.modal.open(content,this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }
  openSModal(content, supplier) {
    this._supplier = supplier;
    this.modal.dismissAll();
    this.openModal(content);
  }

  openProduct1(content, category) {
    this._category = category;
    this._listproducts = this.listproducts.filter(s => s.id_category == this._category.id);
    this.openProduct(content);
    console.log(this.listproducts);
    // console.log(this._listproducts);
  }

  openModalNoCategory(content, category){
    this._category = category;
    this._listproducts = this.listproducts.filter(s => s.id_category == 0);
    this.modal.dismissAll();
    this.openModal(this._prod);
    this.openProduct(content);
  }

  sum(){
    this.orderTotal = this.items.reduce((acc, cur) => {
      return acc + cur.quantity * cur.supplyprice_product;
    }, 0)
  }

  deleteProd(prod){
    this.items = this.items.filter(i => i!=prod);
  }

  selectedX(prods){
    this._prod_selected.push(prods);
    const copy = Object.assign({}, prods)
    this.items.push(copy);
    console.table(this.items);
    this.modal.dismissAll();
    this.openModal(this._prod);
  }

  mathTotal(qty, id_product, supplyprice_product, index){
    let _total = Math.ceil(qty * supplyprice_product);
    let arr = {
      'index' : index,
      'id_product' : id_product,
      'qty': qty,
      'total': _total,

    };
    this.arr_info_product.push(arr);
    var groupByName = {};

    this.arr_info_product.forEach(function (a) {
        groupByName [a.index] = groupByName [a.index] || [];
        groupByName [a.index].push({ id_product: a.id_product, qty: a.qty, total:a.total });
    });

    console.log(groupByName);
    this.number_prod = null;

  }

  //openProducts(content){
  //  this.modal.dismiss();
  //  this.openProduct1(content, this._category);
  //}

  //openCreateModal(content: NgbModalRef) {
  //  this.isCreate = true;
  //  this.form.new();
  //  this.openModal(content);
  //}

  getSupplier() {
    this.SupplierService.getList()
		.subscribe((reponse:any) => {
        this.stopLoading();
         this.listsuppliers = reponse.supplier
		}, err => {
    });
  }

  getCategory(){
    this.CategoryService.getList()
    .subscribe((cate:any) => {
      this.stopLoading();
      this.listcategories = cate.category
    }, err =>{

    });
  }

  getProduct(){
    this.InventoryService.getListProduct()
    .subscribe((prod:any) => {
      this.stopLoading();
      this.listproducts = prod.product;
    }, err =>{

    });
  }

  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }
  ngOnInit() {
    this.getSupplier();
    this.getCategory();
    this.getProduct();
  }

  create_oder() {
    var $listitem = { 
      'info_product' : this.items,
      'total_price' : this.orderTotal
  };
    console.log($listitem);
    this.OrderService.add($listitem)
    .subscribe((cate:any) => {
      this.stopLoading();
    }, err =>{

    });
  }

}
