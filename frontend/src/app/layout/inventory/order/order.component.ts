import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from './order.service';
import { Order } from './model/order';
import { Supplier } from '../supplier/model/supplier';
import { SupplierService} from '../supplier/supplier.service';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/model/category';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  closeResult: string;
  isCreate: boolean;
  loading: boolean;
  form: Order;
  public error = [];
  listorders: Order[];
  selectedId: string;
  modalOptions: NgbModalOptions;
  listsuppliers: any = [];
  listproducts = [{name: 'deha'},{name: 'asaka'}]
  categoriess = [{name: 'demo'},{name: 'sad'}]
  order = [{name: 'kimkim', updatetime: '19 Feb 2019, 06:54'}]
  listcategories: any = [];
  constructor(private notifierService: NotifierService,
    private modal: NgbModal,
    private OrderService: OrderService,
    private SupplierService: SupplierService,
    private CategoryService: CategoryService,
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

  openCreateModal(content: NgbModalRef) {
    this.isCreate = true;
    this.form.new();
    this.openModal(content);
  }

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
  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }
  ngOnInit() {
    this.getSupplier();
    this.getCategory();
  }

}
