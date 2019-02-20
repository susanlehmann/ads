import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { InventoryService } from '../../inventory.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  products: Product[];

  constructor(
    private inventoryService: InventoryService,
  ) { }

  ngOnInit() {
    this.getListProduct();
  }

  getListProduct(){
    this.inventoryService.getListProduct().subscribe((list: any) => {
      this.products = list.product.map(Product.toModel);

    });
  }
  searchProduct(event) {
    const query = {name_product: event.target.value};
    this.inventoryService.searchProduct(query).subscribe((list: any) => {
      this.products = list.product
      .map(Product.toModel)
      .sort((a, b) => {
        return a.id - b.id;
      });
    });
  }
  addProduct() {}

}
