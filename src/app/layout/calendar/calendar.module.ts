import { NgModule } from '@angular/core';
import { ChartsRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EventSesrvice } from './event.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DayViewSchedulerComponent } from './day-view-scheduler/day-view-scheduler.component';
import { CustomCalendarDayViewComponent } from './custom-calendar-day-view/custom-calendar-day-view.component';
import { BlockedTimeComponent } from './add-blocked/add-blocked.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
    imports: [
			SharedModule,
	    ChartsRoutingModule, 
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
		BlockedTimeComponent
    ],
	bootstrap:    [ CalendarComponent ],
	providers: [ EventSesrvice ]
})
export class _CalendarModule {}
