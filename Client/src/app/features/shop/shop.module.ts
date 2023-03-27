import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { PushModule } from '@ngrx/component'

import { ShopComponent } from './shop.component'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductPreviewComponent } from './product-list/product-preview/product-preview.component'
import { ProductDetailsComponent } from './product-details/product-details.component'
import { ProductFiltersComponent } from './product-filters/product-filters.component'
import { ShopRoutingModule } from './shop-routing.module'
import { AppPrimeNGModule } from '@/app-primeng.module';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductSortComponent } from './product-sort/product-sort.component'

@NgModule({
  declarations: [
    ShopComponent,
    ProductListComponent,
    ProductPreviewComponent,
    ProductDetailsComponent,
    ProductFiltersComponent,
    ProductSearchComponent,
    ProductSortComponent,
  ],
  imports: [CommonModule, AppPrimeNGModule, ShopRoutingModule, PushModule, FormsModule],
})
export class ShopModule {}
