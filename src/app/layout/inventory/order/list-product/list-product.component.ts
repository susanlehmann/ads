import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'list-product-modal',
  templateUrl: './list-product.component.html'
})

export class ListProductModalComponent implements OnInit{

  @Input() listproduct: any;
  constructor( private modal: NgbModal){}

  ngOnInit(){

  }

  c() {
  }
}
