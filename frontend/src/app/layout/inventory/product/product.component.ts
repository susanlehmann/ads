import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  products = [{name: 'ad',salesprice: 'đ121',retailprice: 'đ12',stockhand: '1',updatetime: '25 Jan 2019, 13:53'},{name: 'ada',salesprice: 'đ11',retailprice: 'đ2',stockhand: '1',updatetime: '25 Jan 2019, 14:53'}]
}
