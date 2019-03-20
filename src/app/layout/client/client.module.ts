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
import { AddComponent } from './add/add.component';
import { ImportComponent } from './import/import-component';
import { CallingCodeComponent } from '../components/calling_code/calling-code.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap';
@NgModule({
	declarations: [
		ClientComponent, 
		DetailComponent, 
		ListComponent, 
		EditComponent, 
		AddComponent,
		CallingCodeComponent,
		ImportComponent
	],
	imports: [
		FormsModule,
		CommonModule,
		ClientRoutingModule,
		TranslateModule,
		NgbModule.forRoot(),
		BsDropdownModule.forRoot(),
		NgxIntlTelInputModule
	]
})
export class ClientModule { }
