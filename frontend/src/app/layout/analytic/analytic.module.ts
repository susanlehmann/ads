import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticRoutingModule } from './analytic-routing.module';
import { AnalyticComponent } from './analytic.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [AnalyticComponent, DashboardComponent, ReportsComponent],
  imports: [
    CommonModule,
    AnalyticRoutingModule
  ]
})
export class AnalyticModule { }
