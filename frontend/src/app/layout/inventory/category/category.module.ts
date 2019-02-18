import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategoryComponent } from './category.component';
import { CategoryService } from './category.service';

@NgModule({
    imports: [SharedModule],
    declarations: [CategoryComponent],
    providers: [CategoryService]
})
export class CategoryModule { }
