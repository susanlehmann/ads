import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffComponent } from './staff.component';
import { MemberComponent } from './member/member.component';
import { PermissionComponent } from './permission/permission.component';

const routes: Routes = [
    {
        path: '', component: StaffComponent, children: [
            {
                path: '',   redirectTo: 'member', pathMatch: 'full',
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
