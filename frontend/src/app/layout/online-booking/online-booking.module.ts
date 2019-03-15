import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineBookingRoutingModule } from './online-booking-routing.module';
import { OnlineBookingComponent } from './online-booking.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ChannelsComponent } from './channels/channels.component';
import { OverviewComponent } from './overview/overview.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
	  OnlineBookingComponent,
	  AnalyticsComponent,
	  ChannelsComponent,
	  OverviewComponent,
	  PaymentsComponent,
	  ProfileComponent,
	  SettingsComponent
  ],
  imports: [
    CommonModule,
    OnlineBookingRoutingModule
  ]
})
export class OnlineBookingModule { }
