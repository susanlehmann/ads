import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { InventoryService } from '../../inventory.service';
import { NotifierService } from 'angular-notifier';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Stock } from '../model/stock';
import { ExcelService } from '../../../../shared/services/export.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  product: Product;
  stocks: Stock[];
  stockForm: Stock;
  download: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private notifierService: NotifierService,
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
    this.stockForm = new Stock();
    this.modal.open(content, {
      backdrop: 'static',
      size: 'md',
      windowClass: 'stock-modal',
      backdropClass: 'stock-modal',
    });
  }

  addStockHistory(isIncreased) {
    this.product.totalOnHand = isIncreased ? this.product.totalOnHand + this.stockForm.stockQty : this.product.totalOnHand - this.stockForm.stockQty;
    this.stockForm.totalStock = this.product.totalOnHand;
    this.stockForm.productId = this.product.id;
    this.stockForm.isIncreased = isIncreased;

    let updateProd = this.inventoryService.updateProduct(this.product.toDto());
    let updateStock = this.inventoryService.addStockHistory(this.stockForm.toDto());

    forkJoin(updateProd, updateStock).subscribe(v => {
      this.modal.dismissAll();
      this.notifierService.notify('success', 'A new stock history has been successfully added');
      this.loadStockHistory();
    });
  }
  documo: any;
  loadStockHistory(id?) {
    if (!id) id = this.product.id;

    this.inventoryService.getStockHistory(id).subscribe((data: any) => {
    this.stocks = data.stock
    .map(Stock.toModel)
    .sort((a, b) => {
          return b.id - a.id;
        });;
        this.documo = this.stocks.length;
    });
  }

}
