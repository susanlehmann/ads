import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoginRoutingModule,
        FormsModule,
		SnotifyModule
        ],
		  providers: [
		    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
		    SnotifyService
		  ],
    declarations: [LoginComponent]
})
export class LoginModule {}
