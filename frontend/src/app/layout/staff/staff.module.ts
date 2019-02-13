import { NgModule } from '@angular/core';
import { StaffRoutingModule } from './staff-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { StaffComponent } from './staff.component';
import { MemberComponent } from './member/member.component';
import { PermissionComponent } from './permission/permission.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CloseDateComponent } from './close-date/close-date.component';

@NgModule({
    imports: [StaffRoutingModule, SharedModule],
    declarations: [StaffComponent, MemberComponent, PermissionComponent, ScheduleComponent, CloseDateComponent]
})
export class StaffModule { }
