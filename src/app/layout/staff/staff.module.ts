import { NgModule } from '@angular/core';
import { StaffRoutingModule } from './staff-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { StaffComponent } from './staff.component';
import { MemberComponent } from './member/member.component';
import { PermissionComponent } from './permission/permission.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CloseDateComponent } from './close-date/close-date.component';
import { StaffService } from './staff.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [StaffRoutingModule, SharedModule, NgxIntlTelInputModule, DragDropModule],
    declarations: [StaffComponent, MemberComponent, PermissionComponent, ScheduleComponent, CloseDateComponent],
    providers: [StaffService]
})
export class StaffModule { }
