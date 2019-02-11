import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  clients = [
    {
      name: 'Giang Mai',
      number: '123456789',
      email: 'giang@mai.com',
      gender: 'unknown'
    },
    {
      name: 'Giang Mai',
      number: '123456789',
      email: 'giang@mai.com',
      gender: 'unknown'
    },
    {
      name: 'Giang Mai',
      number: '123456789',
      email: 'giang@mai.com',
      gender: 'unknown'
    },
    {
      name: 'Giang Mai',
      number: '123456789',
      email: 'giang@mai.com',
      gender: 'unknown'
    },
    {
      name: 'Giang Mai',
      number: '123456789',
      email: 'giang@mai.com',
      gender: 'unknown'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
