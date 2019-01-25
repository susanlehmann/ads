import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { StaffRoutingModule } from './staff-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StaffComponent } from './staff.component';
import { MemberComponent } from './member/member.component';
import { PermissionComponent } from './permission/permission.component';

@NgModule({
    imports: [CommonModule, StaffRoutingModule, PageHeaderModule,FormsModule, NgbModule],
    declarations: [StaffComponent, MemberComponent, PermissionComponent]
})
export class StaffModule { }
