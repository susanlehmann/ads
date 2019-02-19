import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../inventory.service';
// import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  form: Product;
  enableStock = false;
  enableRetail = false;
  isAdd = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService,
    // private notifierService: NotifierService,
  ) {
    this.form = new Product();
  }

  ngOnInit() {
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

  save() {
    const dto = this.form.toDto();
    if (this.isAdd) {
      this.inventoryService.addProduct(dto)
        .subscribe((data: any) => {
          // this.notifierService.notify('success', 'A new Staff has been successfully added');
          this.router.navigate(['/inventory/products', data.id, 'view']);
        }), err => {

        };
    }
    else {
      this.inventoryService.updateProduct(dto).subscribe((data: any) => {
        this.router.navigate(['/inventory/products', dto.id, 'view']);
        // this.notifierService.notify('success', 'A new Staff has been successfully added');
      }), err => {

      };;
    }
  }

  deleteProduct() {
    this.inventoryService.deleteProduct(this.form.id).subscribe((data: any) => {
      // this.notifierService.notify('success', 'A new Staff has been successfully added');
      this.router.navigate(['/inventory/products']);
    }), err => {

    };;
   }

}
