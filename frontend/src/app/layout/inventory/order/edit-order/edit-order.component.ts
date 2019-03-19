import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../order.service';
import { Order } from '../model/order';
import { Supplier } from '../../supplier/model/supplier';
import { SupplierService } from '../../supplier/supplier.service';
import { CategoryService } from '../../category/category.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../category/model/category';
import { Product } from '../../product/model/product';
import { InventoryService } from '../../inventory.service';
import * as data from '../../../../../assets/country.json';
import { LocationsService } from '../../../../shared/services/location.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  listorder: any;
  number_order: any;
  order: Order;
  listsuppliers: any;
  suppliers: any;
  closeResult: string;
  location: any;
  numberList: number;
  ordera: any;
  listproducts: any;
  _order: any;
  orderTotal1: any;
  _listorder1: any;
  _price: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.loadOrder(id);
    });
    // this.getlist_order();
    // this.getProduct();
    // console.log(this.listproducts);
  };
  loadOrder(id) {
    this.OrderService.findById(id).subscribe((pr: any) => {
      this.order.updateData(pr.order);
      this.ordera = pr.order;
      this.listorder = JSON.parse(pr.order.info_product);
      this.loadLocation();
      this.getSupplier();
      // this.getnamelocation(this.ordera.id_location);
      // console.log(this.listorder);
      // console.log(this.location);
      // console.log(this.ordera.id_location)
    });
  };
  constructor(private notifierService: NotifierService,
    private modal: NgbModal,
    private OrderService: OrderService,
    private route: ActivatedRoute,
    private SupplierService: SupplierService,
    private CategoryService: CategoryService,
    private locationService: LocationsService
  ) {
    this.order = new Order();
  };
  // getlist_order() {
  //   this.OrderService.getList()
  //     .subscribe((listbrands: any) => {
  //       this.number_order = listbrands.order.length;
  //       this.listorder = listbrands.order;
  //     }), err => {
  //     };
  // }
  getSupplier() {
    this.SupplierService.getList()
      .subscribe((reponse: any) => {
        this.listsuppliers = reponse.supplier
      }, err => {
      });
  }
  getNameSupplier(id) {
    let supplier = this.listsuppliers.filter(s => s.id == id);
    return supplier[0].name_supplier;
  }
  // getnamecountry(as){
  //   let country = data.filter(s => s.code == as);
  //   if(country.length > 0)
  //     return country[0].name;
  //   else
  //     return "";
  // }
  loadLocation() {
		var user = JSON.parse(localStorage.getItem('user'));
		this.locationService.listLocation(user.id).subscribe(
			success => {
        this.location = success;
        // console.log(this.location);
				this.numberList = success.location.length;
			},
			error => {
				console.log(error);
			}
		);
	}
  getnamelocation(as){
    let locations = this.location.location.filter(s => s.id == as);
    // console.log(this.location);
    if (this.numberList > 0)
      return locations[0].name_location;
    else
      return "HN";
  }
  openModal(content) {
    this.modal.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
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
          // this.getlist_order();
          this._order.total_price1 = this._price;
          this.notifierService.notify('success', 'update success');
        })
    }

  }
}
