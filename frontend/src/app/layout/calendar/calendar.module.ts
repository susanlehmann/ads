import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
// import { BrowserModule } from '@angular/platform-browser';
import { ChartsRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { PageHeaderModule } from '../../shared';
import { AddEventComponent } from './add-event/add-event.component';
import { EventSesrvice } from './event.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DayViewSchedulerComponent } from './day-view-scheduler/day-view-scheduler.component';
import { CustomCalendarDayViewComponent } from './custom-calendar-day-view/custom-calendar-day-view.component';

@NgModule({
    imports: [
    	// BrowserModule,
    	FormsModule,
	    CommonModule, 
	    Ng2Charts, 
	    ChartsRoutingModule, 
	    PageHeaderModule, 
	    CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
	    }),
    ],
    declarations: [
    	CalendarComponent, 
    	AddEventComponent,
			DayViewSchedulerComponent,
			CustomCalendarDayViewComponent,
    ],
	bootstrap:    [ CalendarComponent ],
	providers: [ EventSesrvice ]
})
export class _CalendarModule {}
