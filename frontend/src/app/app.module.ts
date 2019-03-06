import { CommonModule, LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from  'ngx-ui-loader';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsModalService, ModalModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { HttpcallService } from './shared/services/httpcall.service';
import { _AuthService } from './shared/services/auth.service';
import { ExcelService } from './shared/services/export.service';
import { TokenService } from './shared/services/token.service';
import { SearchComponent } from './search/search.component';
import { UserService } from './shared/services/user.service';
import { SupplierService } from './layout/inventory/supplier/supplier.service';
import { BrandService } from './layout/inventory/brand/brand.service';
import { CategoryService } from './layout/inventory/category/category.service';
import { ServicesService } from './shared/services/serv.service';
import { StaffService } from './layout/staff/staff.service';
import { OrderService } from './layout/inventory/order/order.service';
import {
   SocialLoginModule,
   AuthServiceConfig,
   GoogleLoginProvider,
   FacebookLoginProvider
} from 'angular-6-social-login';
import { EditProductComponent } from './layout/inventory/product/edit-product/edit-product.component';
import { InventoryService } from './layout/inventory/inventory.service';
import { NotifierService } from 'angular-notifier';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { OrderModule } from 'ngx-order-pipe';
import { DataTableModule } from "angular-6-datatable";

export function getAuthServiceConfigs() {
    const config = new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('846467685684390')
            },
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('821751415920-17e3tnbht7vk0mo1iucc3dgmm8rv37uc.apps.googleusercontent.com')
            }
        ]
    );
    return config;
}

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

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
        BrowserModule,
        FormsModule,
        OrderModule,
        BrowserAnimationsModule,
        NgxUiLoaderModule,
        NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        NotifierModule.withConfig(customNotifierOptions),
        SocialLoginModule,
        PDFExportModule,
        NgxIntlTelInputModule,
        ModalModule.forRoot(),
        DataTableModule
    ],
    declarations: [AppComponent, SearchComponent, EditProductComponent],
    providers: [
        AuthGuard,
        HttpcallService,
        _AuthService,
        TokenService,
        UserService,
        CategoryService,
        BrandService,
        ServicesService,
        StaffService,
        OrderService,
        DatePipe,
        InventoryService,
        SupplierService,
        NotifierService,
        BsModalService,
        ExcelService,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: AuthServiceConfig, useFactory: getAuthServiceConfigs}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
