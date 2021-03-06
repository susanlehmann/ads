import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from './order.service';
import { Order } from './model/order';
import { Supplier } from '../supplier/model/supplier';
import { SupplierService } from '../supplier/supplier.service';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/model/category';
import { Product } from '../product/model/product';
import { InventoryService } from '../inventory.service';
import * as data from './../../../../assets/country.json';

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
  //categoriess = [{name: 'demo'},{name: 'sad'}]
  //order = [{name: 'kimkim', updatetime: '19 Feb 2019, 06:54'}]
  listcategories: any = [];
  _supplier: any;
  _category: any;
  listproducts: any;
  _listproducts: any;
  _products: any;
  number_prod: number;
  _prod_selected: any = [];
  _total: any;
  _price: number;
  arr_info_product: any = [];
  listorder: any = [];
  _order: any;
  _listorder: any;
  listinfoproduct: any = [];
  country: any;
  _listorder1: any;
  _updatetime: any;
  _totals: any;
  items = [];
  suppliers: any;
  orderTotal;
  orderTotal1;
  number_order: number;
  statusOrder = [{ id: 1, name: "ORDERED" }, { id: 2, name: "CANCEL" }, { id: 3, name: "RECEIVED" }];
  public datas: [];
  add: any;
  //statusOrder = [{id: 1, name: "ORDERED"}];
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
      size: 'lg',
      windowClass: 'custom-modal',
      backdropClass: 'custom-modal',
    };

  }

  getnamecountry(as){
    let country = data.filter(s => s.code == as);
    if(country.length > 0)
      return country[0].name;
    else
      return "";
  }

  ngOnInit() {
    this.getSupplier();
    this.getCategory();
    this.getProduct();
    this.getlist_order();
    this.assignCopy();
  }

  openProduct(content: NgbModalRef) {
    console.log('add product');
    console.log(this.listcategories);
    console.log(this.listpro);
    this.modal.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }
  check: any;
  openModal(content: NgbModalRef) {
    this.modal.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
    this.check = this.listsuppliers.length;
  }
  openSModal(content, supplier) {
    this._supplier = supplier;
    this.add = this.items.length;
    console.log(this.add);
    console.log('addddd' + this.add);
    this.modal.dismissAll();
    this.openModal(content);
  }
  removeitem(){
    this.items = [];
  }
  listpro: any;
  openProduct1(content, category) {
    this._category = category;
    console.log('open product');
    this._listproducts = this.listproducts.filter(s => s.id_category == this._category.id);
    this.listpro = this._listproducts.length;
    this.modal.dismissAll();
    this.openModal(this._prod);
    this.openProduct(content);
    // console.log(this.items.length)
    //console.log(this.listproducts);
    // console.log(this._listproducts);
  }

  openProducts(content){
    this.modal.dismissAll();
    this.openModal(this._prod);
    this.openProduct(content);
  }

  openModalNoCategory(content, category) {
    this._category = category;
    //console.log(this.listproducts);
    this._listproducts = this.listproducts.filter(s => s.id_category == 0);
    this.modal.dismissAll();
    this.openModal(this._prod);
    this.openProduct(content);
  }

  editOrder(content: NgbModalRef, order) {
    this._listorder1 = JSON.parse(order.info_product);
    this._order = order;
    console.log(this._listorder1);
    // this.getNameSupplier(order.id_supplier);
    this._order.total_price1 = this._order.total_price;
    this.openModal(content);
  }

  getNameproduct(id) {
    let product = this.listproducts.filter(s => s.id == id);
    return product[0].name_product;
  }

  // getNameSupplier(id) {
  //   let supplier = this.listsuppliers.filter(s => s.id == id);
  //   this.suppliers = supplier[0];
  //   return supplier[0].name_supplier;
  // }

  sum() {
    this.orderTotal = this.items.reduce((acc, cur) => {
      if(cur.quantity == undefined) {
        cur.quantity = 0;
      }
      if(cur.supplyprice_product == undefined) {
        cur.supplyprice_product = 0;
      }
      this.orderTotal1 = acc + cur.quantity * cur.supplyprice_product;
      return this.orderTotal1;
    }, 0)

    // this.orderTotal1 = this.items.reduce((acc, cur) => {
    //   if(cur.quantity == undefined) {
    //     cur.quantity = 0;
    //   }
    //   if(cur.supplyprice_product == undefined) {
    //     cur.supplyprice_product = 0;
    //   }
    //   return acc + cur.quantity * cur.supplyprice_product;
    // }, 0)
  }

  sumEdit() {
    this._order.total_price1 = this._listorder1.reduce((acc, cur) => {
      return acc + cur.qty_product_receive * cur.price_product;
    }, 0)
  }

  deleteProd(prod) {
    this.items = this.items.filter(i => i != prod);
    this.sum();
  }

  selectedX(prods) {
    this._prod_selected.push(prods);
    const copy = Object.assign({}, prods)
    this.items.push(copy);
    console.table(this.items);
    this.modal.dismissAll();
    this.openModal(this._prod);
  }

  mathTotal(qty, id_product, supplyprice_product, index) {
    let _total = Math.ceil(qty * supplyprice_product);
    let arr = {
      'index': index,
      'id_product': id_product,
      'qty': qty,
      'total': _total,

    };
    this.arr_info_product.push(arr);
    var groupByName = {};

    this.arr_info_product.forEach(function (a) {
      groupByName[a.index] = groupByName[a.index] || [];
      groupByName[a.index].push({ id_product: a.id_product, qty: a.qty, total: a.total });
    });

    //console.log(groupByName);
    //console.log(this.arr_info_product);
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
      .subscribe((reponse: any) => {
        this.stopLoading();
        this.listsuppliers = reponse.supplier
      }, err => {
      });
  }

  getCategory() {
    this.CategoryService.getList()
      .subscribe((cate: any) => {
        this.stopLoading();
        this.listcategories = cate.category;
      }, err => {

      });
  }

  getProduct() {
    this.InventoryService.getListProduct()
      .subscribe((prod: any) => {
        this.stopLoading();
        this.listproducts = prod.product;
      }, err => {

      });
  }

  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }


  getlist_order() {
    this.OrderService.getList()
      .subscribe((listbrands: any) => {
        this.stopLoading();
        this.number_order = listbrands.order.length;
        this.listorder = listbrands.order;
      }), err => {
        this.stopLoading();
      };
  }

  create_oder(c) {
    var $listitem = {
      'info_product': this.items,
      'total_price': this.orderTotal,
      'id_supplier': this._supplier.id
    };
    this.OrderService.add($listitem)
      .subscribe((cate: any) => {
        this.modal.dismissAll();

        this.OrderService.getList()
          .subscribe((listbrands: any) => {
            this.number_order = listbrands.order.length;
            this.listorder = listbrands.order;
            console.log(c + "   " +  this.listorder[this.listorder.length - 1]);
            this.editOrder(c, this.listorder[this.listorder.length - 1]);
            this.items = [];
            this.orderTotal1 = 0;
          });

        this.notifierService.notify('success', 'A new order has been successfully added');
      }, err => {

      });
    //this.statusOrder.id = 1;
  }

  update(data: any) {
    data.total_product = this._order.total_price;
    return this.OrderService.update(data)
      .subscribe(
        success => {
          return true;
        }
      )
  }

  status_order(id_order, status) {
    this.orderTotal1 = this._order.total_price1;
    this._order.info_product = this._listorder1;
    this._price = this.orderTotal1;
    this._order.total_price = this._order.total_price1;
    if (this.update(this._order)) {
      let arr = {
        'id': id_order,
        'status': status
      };
      // console.log(arr);
      this.OrderService.status(arr)
        .subscribe((liststatus: any) => {
          this._order.total_price1 = this._order.total_price;
          this._order = liststatus.order;
          this.getlist_order();
          this._order.total_price1 = this._price;
          this.notifierService.notify('success', 'update success');
        })
    }

  }
  send_email_order(mail: any) {
    let $send = {
      'email': mail
    };
    console.log($send);
    this.OrderService.sent_email($send)
      .subscribe((sendmail: any) => {
        if (sendmail == true) {
          this.notifierService.notify('success', 'send email success');
        } else {
          this.notifierService.notify('error', 'send email failed, email not found');
        }
        // this.supplier.email_supplier = sendmail.mail;
        //console.log(this.supplier.email);
      });
  }
  export_pdf_data(id: any) {
    let link = this.OrderService.export_pdf(id);
    var a = document.createElement('a');
    a.href = link;
    a.click();
  }

  // searchOrder(event) {
  //   const query = {id_order: event.target.value};
  //   this.OrderService.searchOrder(query).subscribe((list: any) => {
  //     this.listorders = list.order.map(Order.toModel);
  //   });
  //  }
  assignCopy(){
    this.listorders = Object.assign([], this.items);
  }
  filterItem(value){
    if(!value){
        this.assignCopy();
    } // when nothing has typed
    this.listorders = Object.assign([], this.items).filter(
       item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

  //  searchProduct(event) {
  //   const query = {name_product: event.target.value };
  //   this.InventoryService.searchProduct(query).subscribe((list: any) => {
  //     this.listproducts = list.product
  //     .map(Product.toModel);
  //     });
  //   };
}
