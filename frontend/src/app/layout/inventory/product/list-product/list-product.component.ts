import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { InventoryService } from '../../inventory.service';
import { forkJoin, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  products: Product[];
  brands;
  categories;
  suppliers;
  hasProduct: boolean;

  brandId = 0;
  categoryId = 0;
  supplierId = 0;
  keyword: string;
  keyWordChanged: Subject<string>;

  constructor(
    private inventoryService: InventoryService,
  ) { 
    this.products = [];
    this.hasProduct = false;
    this.keyWordChanged = new Subject<string>();
  }

  ngOnInit() {
    this.keyWordChanged.pipe(
      debounceTime(500))
      .subscribe(text => {
        this.keyword = text;
        this.searchProduct();
      });

    this.loadPreData();
    this.getListProduct();
  }

  getListProduct() {
    this.inventoryService.getListProduct().subscribe((list: any) => {
      this.products = list.product.map(Product.toModel);
      this.hasProduct = this.products.length === 0 ? false : true;
    });
  }

  changed(text) {
    this.keyWordChanged.next(text);
  }

  searchProduct() {
    const query = {
      name_product: this.keyword,
      id_brand: this.brandId,
      id_category: this.categoryId,
      id_supplier: this.supplierId,
    };

    this.inventoryService.searchProduct(query).subscribe((list: any) => {
      this.products = list.product
      .map(Product.toModel)
      .sort((a, b) => {
        return a.id - b.id;
      });
    });
  }

  clearFilters(){
    this.brandId = 0;
    this.categoryId = 0;
    this.supplierId = 0;
    this.keyword = "";
    this.getListProduct();
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

  addProduct() {}

}
