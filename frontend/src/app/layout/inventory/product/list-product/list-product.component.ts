import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  products: Product[];

  constructor() { }

  ngOnInit() {
    this.getListProduct();
  }

  getListProduct(){
    this.products = [
      new Product(),
      new Product(),
      new Product(),
      new Product(),
    ];
  }
  searchProduct() {}
  addProduct() {}

}
