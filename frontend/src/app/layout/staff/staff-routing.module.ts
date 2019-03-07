import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffComponent } from './staff.component';
import { MemberComponent } from './member/member.component';
import { PermissionComponent } from './permission/permission.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CloseDateComponent } from './close-date/close-date.component';

const routes: Routes = [
    {
        path: '', component: StaffComponent, children: [
            {
                path: '',   redirectTo: 'schedule', pathMatch: 'full',data : { title: 'Staff' }
            },
            {
                path: 'schedule',
                component: ScheduleComponent,data : { title: 'Staff' }
            },
            {
                path: 'closed_dates',
                component: CloseDateComponent,data : { title: 'Staff' }
            },
            {
                path: 'member',
                component: MemberComponent,data : { title: 'Staff' }
            },
            {
                path: 'permissions',
                component: PermissionComponent,data : { title: 'Staff' }
            },
          ],data : { title: 'Staff' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaffRoutingModule { }
