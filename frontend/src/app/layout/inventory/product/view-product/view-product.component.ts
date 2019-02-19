import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { InventoryService } from '../../inventory.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  product: Product;
  stocks = [1,1,1,1,1];

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private modal: NgbModal,
  ) {
    this.product = new Product();
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.loadProduct(id);
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

  increaseStock() {}

}
