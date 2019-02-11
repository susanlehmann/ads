import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ClientComponent, DetailComponent, ListComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    TranslateModule,
  ]
})
export class ClientModule { }
