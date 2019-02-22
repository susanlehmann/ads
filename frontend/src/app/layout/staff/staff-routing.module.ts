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
                path: '',   redirectTo: 'schedule', pathMatch: 'full',
            },
            {
                path: 'schedule',
                component: ScheduleComponent
            },
            {
                path: 'closed_dates',
                component: CloseDateComponent
            },
            {
                path: 'member',
                component: MemberComponent
            },
            {
                path: 'permissions',
                component: PermissionComponent
            },
          ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaffRoutingModule { }
