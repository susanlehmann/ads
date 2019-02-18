import { NgModule } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './modules/page-header/page-header.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PageHeaderModule,
    NgbModule,
    NgxLoadingModule.forRoot({
      backdropBackgroundColour: '#ffffff',
      fullScreenBackdrop: true,
    }),
  ],
  exports: [
    CommonModule,
    FormsModule,
    PageHeaderModule,
    NgbModule,
    NgxLoadingModule,
    TranslateModule,
  ]
})
export class SharedModule { }
