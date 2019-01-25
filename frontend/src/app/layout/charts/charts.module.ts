import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
// import { BrowserModule } from '@angular/platform-browser';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';
import { NgxTuiCalendarModule } from 'ngx-tui-calendar';
import { FullCalendarModule } from 'ng-fullcalendar'
import { AddEventComponent } from './add-event/add-event.component';
import { HelloComponent } from './hello.component';
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
    declarations: [ChartsComponent,HelloComponent, AddEventComponent],
	  bootstrap:    [ ChartsComponent ],
	  providers: [ EventSesrvice ]
})
export class ChartsModule {}
