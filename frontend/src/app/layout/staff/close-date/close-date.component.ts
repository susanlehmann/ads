import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-close-date',
  templateUrl: './close-date.component.html',
  styleUrls: ['./close-date.component.scss']
})
export class CloseDateComponent implements OnInit {
  dates = [
    1,2,3,4,5
  ]

  constructor() { }

  ngOnInit() {
  }

}
