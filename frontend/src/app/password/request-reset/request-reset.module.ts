import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RequestResetComponent } from './request-reset.component';
import { RequestResetRoutingModule } from './request-reset-routing.module';

@NgModule({
    imports: [
        CommonModule,
        RequestResetRoutingModule,
        FormsModule
    ],
    declarations: [
        RequestResetComponent,
    ]
})
export class RequestResetModule { }
