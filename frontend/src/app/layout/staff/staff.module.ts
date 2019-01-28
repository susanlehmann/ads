import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { StaffRoutingModule } from './staff-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StaffComponent } from './staff.component';
import { MemberComponent } from './member/member.component';
import { PermissionComponent } from './permission/permission.component';
import { NgxLoadingModule } from 'ngx-loading';
import { ScheduleComponent } from './schedule/schedule.component';
import { CloseDateComponent } from './close-date/close-date.component';

@NgModule({
    imports: [CommonModule, StaffRoutingModule, PageHeaderModule,FormsModule, NgbModule, NgxLoadingModule.forRoot({})],
    declarations: [StaffComponent, MemberComponent, PermissionComponent, ScheduleComponent, CloseDateComponent]
})
export class StaffModule { }