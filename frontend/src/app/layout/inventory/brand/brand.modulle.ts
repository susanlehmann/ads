import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { BrandComponent } from './brand.component';
import { BrandService } from './brand.service';

@NgModule({
    imports: [SharedModule],
    declarations: [BrandComponent],
    providers: [BrandService]
})
export class BrandModule { }
