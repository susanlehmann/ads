import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [ClientComponent, DetailComponent, ListComponent, EditComponent],
  imports: [
    FormsModule,
    CommonModule,
    ClientRoutingModule,
    TranslateModule,
    NgbModule.forRoot()
  ]
})
export class ClientModule { }
