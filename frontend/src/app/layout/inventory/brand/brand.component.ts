import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Brand } from './model/brand';
import { BrandService } from './brand.service';
//import { OrderPipe, OrderModule } from 'ngx-order-pipe';
import { Product } from '../product/model/product';
import { InventoryService } from '../inventory.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})


export class BrandComponent implements OnInit  {
  loading: boolean;
  form: Brand;
  public error = [];
  closeResult: string;
  listbrands: Brand[];
  isCreate: boolean;
  selectedId: string;
  order: string = 'brandName';
  sortedCollection: any[];
  reverse: boolean = false;
  collection: any[] = this.listbrands;
  _list :any;
  listproducts: any;
  number_display: number;
  modalOptions: NgbModalOptions;

  constructor(private notifierService: NotifierService,
    private modal: NgbModal,
    private BrandService: BrandService,
    private InventoryService: InventoryService,
    private orderPipe: OrderPipe,
    //private orderPipe: OrderPipe,
  ) {
    this.form = new Brand();
    //this.listbrands = [];
    this.sortedCollection = orderPipe.transform(this.collection, 'brandName');
    //console.log(this.orderPipe.transform(this.collection, this.order));
    console.log(this.sortedCollection);
    this.modalOptions = {
      backdrop: 'static',
      size: 'md',
      windowClass: 'custom-modal',
      backdropClass: 'custom-modal',
    };
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
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

  openUpdateModal(content: NgbModalRef, brandID) {
    this.isCreate = false;
    this.selectedId = brandID;
    this.BrandService.findById(brandID)
    .subscribe((data:any) => {
            this.form.updateData(data.brand);
            this.openModal(content);
        });
  }

  getBrand() {
    this.startLoading();
    this.BrandService.getList()
		.subscribe((listbrands:any) => {
        this.stopLoading();
         this.number_display = listbrands.brand.length;
         this.listbrands = listbrands.brand
         .map(Brand.toModel)
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
      this.addBrand(dto);
    } else {
      this.updateBrand(dto);
    }
    this.modal.dismissAll();
  }

  addBrand(Brand): void {
    this.BrandService.add(Brand)
    .subscribe((data:any) => {
            this.stopLoading();
            this.getBrand();
            this.notifierService.notify('success', 'A new Brand has been successfully added');
    }), err => {
      this.stopLoading();
    };
    }

  updateBrand(Brand) {
    this.BrandService.update(Brand)
    .subscribe((data:any) => {
            this.stopLoading();
            this.getBrand();
            this.notifierService.notify('success', 'Brand information has been successfully updated');
    }), err => {
      this.stopLoading();
    };
    }

  deleteBrand(name) {
    if(confirm("Are you sure to delete "+ name)){
      this.BrandService.deletebrand(this.selectedId)
      .subscribe((data:any) => {
              this.getBrand();
              this.notifierService.notify('success', 'A Brand has been successfully deleted');
          });
      this.modal.dismissAll();
    }
  }


  //private getDismissReason(reason: any): string {
  //  if (reason === ModalDismissReasons.ESC) {
  //    return 'by pressing ESC';
  //  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //    return 'by clicking on a backdrop';
  //  } else {
  //    return  `with: ${reason}`;
  //  }
  //}
  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
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
  _brand :any;
  getNumberproduct(brand) {

    this._brand = brand;
    //id = this.
    //let product = this.listproducts.filter(s => s.id_category == id);
    this._list = this.listproducts.filter(s => s.id_brand == this._brand.id)
    //console.log(this._list);
    return this._list.length;

  }

  ngOnInit() {
    this.getBrand();
    this.getProduct();
  }
  searchBrand(event){
    //const search: any = {};
    //Object.assign(search, { 'getbrand': JSON.parse(localStorage.getItem('brand')), 'name_brand': event.target.value});
	//	this.startLoading();
	//	this.BrandService.searchBrand(search).subscribe(
	//		success => {
	//			this.stopLoading();
	//			this.listbrands = success;
	//		},
	//		error => {
    //    this.stopLoading();
    //    console.log(error);
	//		}
	//	);
	//}
	 const query = {name_brand: event.target.value};
	 this.BrandService.searchBrand(query).subscribe((list: any) => {
       this.listbrands = list.brand.map(Brand.toModel);
     });

  }

}
