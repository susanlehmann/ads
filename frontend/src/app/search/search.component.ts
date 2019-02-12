import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  appointments = [1,2,3,4,5];

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
}
