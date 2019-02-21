import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewPasswordComponent } from './new-password.component';
import { NewPasswordRoutingModule } from './new-password-routing.module';

@NgModule({
    imports: [
        CommonModule,
        NewPasswordRoutingModule,
        FormsModule
    ],
    declarations: [
        NewPasswordComponent,
    ]
})
export class NewPasswordModule { }
