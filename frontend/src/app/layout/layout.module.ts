import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { NgxLoadingModule  } from 'ngx-loading';

const customNotifierOptions: NotifierOptions = {
    behaviour: {
        autoHide: 5000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 3
      },
    position: {
          horizontal: {
              position: 'right',
              distance: 12
          },
          vertical: {
              position: 'bottom',
              distance: 12,
              gap: 10
          }
      }
    }

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbModule.forRoot(),
        LoadingBarHttpClientModule,
        NgxLoadingModule,
        NotifierModule.withConfig(customNotifierOptions),
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent]
})
export class LayoutModule {}
