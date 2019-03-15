import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineBookingComponent } from './online-booking.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ChannelsComponent } from './channels/channels.component';
import { OverviewComponent } from './overview/overview.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
	{
		path: '', 
		component: OnlineBookingComponent, 
		children: [
			{
				path: '',   
				redirectTo: 'overview', 
				pathMatch: 'full', 
				data: {title: 'Online Booking'} 
			},
			{
				path: 'overview', 
				component: OverviewComponent, 
				data: {title: 'Online Booking'} 
			},
			{
				path: 'profile', 
				component: ProfileComponent, 
				data: {title: 'Online Booking'} 
			},
			{
				path: 'channels', 
				component: ChannelsComponent, 
				data: {title: 'Online Booking'} 
			},
			{
				path: 'settings', 
				component: SettingsComponent, 
				data: {title: 'Online Booking'} 
			},
			{
				path: 'analytics', 
				component: AnalyticsComponent, 
				data: {title: 'Online Booking'} 
			},
			{
				path: 'payments', 
				component: PaymentsComponent, 
				data: {title: 'Online Booking'} 
			}
		],
		data: {title: 'Online Booking'}
	}
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class OnlineBookingRoutingModule { }
