import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineBookingComponent } from './online-booking.component';
import { BookingButtonComponent } from './booking-button/booking-button.component';
import { FacebookComponent } from './facebook/facebook.component';
import { EmbededWidgetComponent } from './embeded-widget/embeded-widget.component';

const routes: Routes = [
  {
    path: '', component: OnlineBookingComponent, children: [
      {path: '',   redirectTo: 'button', pathMatch: 'full' },
      {path: 'button', component: BookingButtonComponent },
      {path: 'facebook', component: FacebookComponent },
      {path: 'widget', component: EmbededWidgetComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineBookingRoutingModule { }
