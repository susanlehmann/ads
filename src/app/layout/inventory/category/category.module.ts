import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryService } from './category.service';

@NgModule({
    imports: [SharedModule],
    providers: [CategoryService]
})
export class CategoryModule { }
