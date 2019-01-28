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

@NgModule({
    imports: [
    	// BrowserModule,
    	FormsModule,
    	FullCalendarModule,
	    CommonModule, 
	    Ng2Charts, 
	    ChartsRoutingModule, 
	    PageHeaderModule, 
	    NgxTuiCalendarModule.forRoot(),
    ],
    declarations: [CalendarComponent, AddEventComponent],
	  bootstrap:    [ CalendarComponent ],
	  providers: [ EventSesrvice ]
})
export class CalendarModule {}
