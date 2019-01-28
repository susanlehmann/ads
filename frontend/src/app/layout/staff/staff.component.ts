import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
selector: 'app-staff',
templateUrl: './staff.component.html',
styleUrls: ['./staff.component.scss'],
animations: [routerTransition()]
})

export class StaffComponent implements OnInit {
  
  ngOnInit(): void {
  }

}