import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PushModule } from '@ngrx/component'

import { ShopComponent } from './shop/shop.component'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductPreviewComponent } from './product-list/product-preview/product-preview.component'
import { ProductDetailsComponent } from './product-details/product-details.component'
import { ProductFiltersComponent } from './product-filters/product-filters.component'
import { ShopRoutingModule } from './shop-routing.module'
import { AppPrimeNGModule } from '@/app-primeng.module'

@NgModule({
  declarations: [
    ShopComponent,
    ProductListComponent,
    ProductPreviewComponent,
    ProductDetailsComponent,
    ProductFiltersComponent,
  ],
  imports: [CommonModule, AppPrimeNGModule, ShopRoutingModule, PushModule],
})
export class ShopModule {}
