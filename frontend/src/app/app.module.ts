import { CommonModule, LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from  'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { HttpcallService } from './shared/services/httpcall.service';
import { AuthService } from './shared/services/auth.service';
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

export function getAuthServiceConfigs() {
    const config = new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('Your_Facebook_Client_ID')
            },
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('Your_Google_Client_ID')
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

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
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
        SocialLoginModule
    ],
    declarations: [AppComponent, SearchComponent, EditProductComponent],
    providers: [
        AuthGuard,
        HttpcallService,
        AuthService,
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
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
