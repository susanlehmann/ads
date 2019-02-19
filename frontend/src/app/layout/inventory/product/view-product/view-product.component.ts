import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { InventoryService } from '../../inventory.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Stock } from '../model/stock';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  product: Product;
  stocks: Stock[];
  stockForm: Stock;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private modal: NgbModal,
  ) {
    this.product = new Product();
    this.stockForm = new Stock();
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.loadProduct(id);
      this.loadStockHistory(id);
   });
  }

  loadProduct(id) {
    this.inventoryService.findProductById(id).subscribe((pr: any) => {
      this.product.updateData(pr.product);
    });
  }

  openModal(content: NgbModalRef) {
    this.modal.open(content, {
      backdrop: 'static',
      size: 'md'
    });
  }

  addStockHistory(isIncreased) {
    const dto = this.stockForm.toDto();
    const productId = this.product.id;
    dto.id_product = productId;
    dto.status_stock = isIncreased ? 1 : 0;
    this.inventoryService.addStockHistory(dto).subscribe(v => {
      this.modal.dismissAll();
      this.loadStockHistory(productId);
    });
  }

  loadStockHistory(id) {
    this.inventoryService.getStockHistory(id).subscribe((data: any) => {
    this.stocks = data.stock;
    });
  }

}
