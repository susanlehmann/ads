import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NewPasswordComponent } from './new-password.component';


const routes: Routes = [
    {
        path: '',
        component: NewPasswordComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class NewPasswordRoutingModule { }
