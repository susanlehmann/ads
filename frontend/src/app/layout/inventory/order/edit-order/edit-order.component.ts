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

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  listorder: any;
  number_order: any;
  order: Order;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.loadOrder(id);
    });
  };
  loadOrder(id) {
    this.OrderService.findById(id).subscribe((pr: any) => {
      this.order.updateData(pr.order);
    });
  };
  constructor(private notifierService: NotifierService,
    private OrderService: OrderService,
    private route: ActivatedRoute,
    private SupplierService: SupplierService,
    private CategoryService: CategoryService,
    private InventoryService: InventoryService,
  ) {
    this.order = new Order();
  };
}
