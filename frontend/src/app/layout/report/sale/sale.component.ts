import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  constructor(private notifier: NotifierService) { }

  ngOnInit() {
  }

  showNotification(id: string, message: string) {
    this.notifier.notify( id, message );
  }

}
