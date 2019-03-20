import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../order.service';
import { Order } from '../model/order';
import { Supplier } from '../../supplier/model/supplier';
import { SupplierService } from '../../supplier/supplier.service';
import { CategoryService } from '../../category/category.service';
import { ActivatedRoute } from '@angular/router';
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
  orderTotal1: any;
  _price: any;
  locationss: any;
  sup: any;
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
    private locationService: LocationsService
  ) {
    this.order = new Order();
  };
  getSupplier() {
    this.SupplierService.getList()
      .subscribe((reponse: any) => {
        this.listsuppliers = reponse.supplier
      }, err => {
      });
  }
  getNameSupplier(id) {
    let supplier = this.listsuppliers.filter(s => s.id == id);
    this.sup = supplier[0];
    console.log(this.sup)
    return supplier[0].name_supplier;
  }
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
    this.locationss = locations[0];
    console.log(this.locationss.city_location);
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
    data.total_product = this.ordera.total_price;
    return this.OrderService.update(data)
      .subscribe(
        success => {
          return true;
        }
      )
  }
  sumEdit() {
    this.ordera.total_price = this.listorder.reduce((acc, cur) => {
      return acc + cur.qty_product_receive * cur.price_product;
    }, 0)
  }
  status_order(id_order, status) {
    this.orderTotal1 = this.ordera.total_price;
    this.ordera.info_product = this.listorder;
    this._price = this.orderTotal1;
    if (this.update(this.ordera)) {
      let arr = {
        'id': id_order,
        'status': status
      };
      // console.log(arr);
      this.OrderService.status(arr)
        .subscribe((liststatus: any) => {
          this.ordera = liststatus.ordera;
          // this.getlist_order();
          this.ordera.total_price = this._price;
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
}
