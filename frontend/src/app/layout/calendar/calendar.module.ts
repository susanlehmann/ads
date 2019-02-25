import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
// import { BrowserModule } from '@angular/platform-browser';
import { ChartsRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { PageHeaderModule } from '../../shared';
import { NgxTuiCalendarModule } from 'ngx-tui-calendar';
import { FullCalendarModule } from 'ng-fullcalendar'
import { AddEventComponent } from './add-event/add-event.component';
import { EventSesrvice } from './event.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { WeekComponents } from './box/week-components/week-components';
import { DayComponents } from './box/day-components/day-components';
import { DynamicComponent } from './box/dynamic/dynamic-component';

@NgModule({
    imports: [
    	// BrowserModule,
    	FormsModule,
    	FullCalendarModule,
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
    	DynamicComponent,
    	WeekComponents,
    	DayComponents
    ],
	bootstrap:    [ CalendarComponent ],
	providers: [ EventSesrvice ]
})
export class _CalendarModule {}
