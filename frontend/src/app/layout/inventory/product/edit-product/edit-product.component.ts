import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../inventory.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbModal, NgbModalRef, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { Stock } from '../model/stock';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  form: Product;
  isAdd = true;
  form1: Stock;
  brands;
  categories;
  suppliers;
  taxs = [];
  modalOptions: NgbModalOptions;
  closeResult: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService,
    private notifierService: NotifierService,
    private modal: BsModalService,
  ) {
    this.form = new Product();
    this.form1 = new Stock();
    this.modalOptions = {
        backdrop: 'static',
        size: 'md',
    };
  }

  ngOnInit() {
    this.loadPreData();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isAdd = false;
        this.loadProduct(id);
      } else {
        this.isAdd = true;
      }
    });
  }

  loadProduct(id) {
    this.inventoryService.findProductById(id).subscribe((pr: any) => {
      this.form.updateData(pr.product);
    });
  }

  loadPreData() {
    let brand = this.inventoryService.getListBrand();
    let cate = this.inventoryService.getListCategory();
    let supplier = this.inventoryService.getListSupplier();

    forkJoin([brand, cate, supplier]).subscribe((rs: any) => {
      this.brands = rs[0].brand;
      this.categories = rs[1].category;
      this.suppliers = rs[2].supplier;
    });
  }

  save() {
    const dto = this.form.toDto();
    if (this.isAdd) {
      this.inventoryService.addProduct(dto)
        .subscribe((data: any) => {
          this.notifierService.notify('success', 'A new product has been successfully added');
          this.router.navigate(['/inventory/products', data.id, 'view']);
        }), err => {

        };
    }
    else {
      this.inventoryService.updateProduct(dto).subscribe((data: any) => {
        this.router.navigate(['/inventory/products', dto.id, 'view']);
        this.notifierService.notify('success', 'The product has been successfully updated');
      }), err => {

      };;
    }
  }

  deleteProduct() {
    this.inventoryService.deleteProduct(this.form.id).subscribe((data: any) => {
      this.modal.hide(1);
      this.notifierService.notify('success', 'The product has been successfully deleted');
      this.router.navigate(['/inventory/products']);
    }), err => {

    };
   }

     openModal(content: BsModalRef) {
      this.modal.show(content);

    }

    close() {
      this.modal.hide(1);
    }

}
