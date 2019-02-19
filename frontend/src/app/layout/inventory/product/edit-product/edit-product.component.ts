import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ActivatedRoute } from '@angular/router';

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
  ) {
    this.form = new Product();
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isAdd = false;
        this.findById(id);
      } else {
        this.isAdd = true;
      }
   });
  }

  findById(id: string) {
    console.log(id);
  }

  save() {
    const dto = this.form.toDto();
    console.table(dto);
  }

  deleteProduct(){}

}
