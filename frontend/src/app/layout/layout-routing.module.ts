import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'staff', loadChildren: './staff/staff.module#StaffModule' },
            { path: 'report', loadChildren: './report/report.module#ReportModule' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'inventory', loadChildren: './inventory/inventory.module#InventoryModule' },
            { path: 'client', loadChildren: './client/client.module#ClientModule' },
            { path: 'message', loadChildren: './message/message.module#MessageModule' },
            { path: 'online_booking', loadChildren: './online-booking/online-booking.module#OnlineBookingModule' },
            { path: 'analytic', loadChildren: './analytic/analytic.module#AnalyticModule' },
            { path: 'setup', loadChildren: './setup/setup.module#SetupModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
