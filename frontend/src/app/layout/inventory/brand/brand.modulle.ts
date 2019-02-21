import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrandService } from './brand.service';

@NgModule({
    imports: [SharedModule],
    providers: [BrandService]
})
export class BrandModule { }
