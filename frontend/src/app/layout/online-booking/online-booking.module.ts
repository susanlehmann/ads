import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineBookingRoutingModule } from './online-booking-routing.module';
import { OnlineBookingComponent } from './online-booking.component';
import { BookingButtonComponent } from './booking-button/booking-button.component';
import { FacebookComponent } from './facebook/facebook.component';
import { EmbededWidgetComponent } from './embeded-widget/embeded-widget.component';

@NgModule({
  declarations: [OnlineBookingComponent, BookingButtonComponent, FacebookComponent, EmbededWidgetComponent],
  imports: [
    CommonModule,
    OnlineBookingRoutingModule
  ]
})
export class OnlineBookingModule { }
