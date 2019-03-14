import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { SearchComponent } from './search/search.component';
import { EditProductComponent } from './layout/inventory/product/edit-product/edit-product.component';
import { AddAppointmentComponent } from './layout/calendar/add-appointments/add-appointment.component';
const routes: Routes = [
    { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard]},
    // { path: '', loadChildren: './layout/layout.module#LayoutModule'},
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    { path: 'reset-password', loadChildren: './password/request-reset/request-reset.module#RequestResetModule' },
    { path: 'new-password/:email/:token', loadChildren: './password/new-password/new-password.module#NewPasswordModule' },
    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: 'search', component: SearchComponent },
    { path: 'inventory/products/add', component: EditProductComponent },
    { path: 'inventory/products/:id/edit', component: EditProductComponent },
    { path: 'appointment/add', component: AddAppointmentComponent, data: {title: 'Appointment'} },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
