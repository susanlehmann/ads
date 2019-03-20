import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RequestResetComponent } from './request-reset.component';


const routes: Routes = [
    {
        path: '',
        component: RequestResetComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class RequestResetRoutingModule { }
