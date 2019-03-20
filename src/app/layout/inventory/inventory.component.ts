import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
selector: 'app-inventory',
templateUrl: './inventory.component.html',
styleUrls: ['./inventory.component.scss'],
animations: [routerTransition()]
})

export class InventoryComponent implements OnInit {

  ngOnInit(): void {
  }

}
