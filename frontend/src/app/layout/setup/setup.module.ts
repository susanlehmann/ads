import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SetupRoutingModule } from './setup-routing.module';
import { SetupComponent } from './setup.component';
import { LocationComponent } from './locations/locations.component';
import { AddLocationComponent } from './locations/add/add-location.component';
import { EditLocationComponent } from './locations/edit/edit-location.component';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [
  	SetupComponent,
  	LocationComponent,
  	PageComponent,
  	AddLocationComponent,
    EditLocationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    SetupRoutingModule
  ]
})
export class SetupModule { }
