import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
