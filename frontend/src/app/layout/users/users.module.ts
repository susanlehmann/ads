import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule } from '@angular/forms';

import { UsersComponent } from './users.component';

@NgModule({
    imports: [CommonModule, UsersRoutingModule, PageHeaderModule,FormsModule],
    declarations: [UsersComponent]
})
export class UsersModule { }
