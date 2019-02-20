import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'list-product-modal',
  templateUrl: './list-product.component.html'
})

export class ListProductModalComponent implements OnInit{

  @Input() listproduct: any;
  constructor(){}

  ngOnInit(){

  }
}
