import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { LetModule, PushModule } from '@ngrx/component'

import { ShopComponent } from './shop.component'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductPreviewComponent } from './product-list/product-preview/product-preview.component'
import { ProductDetailsComponent } from './product-details/product-details.component'
import { ProductFiltersComponent } from './product-filters/product-filters.component'
import { ProductSearchComponent } from './product-search/product-search.component'
import { ProductSortComponent } from './product-sort/product-sort.component'
import { EditProductComponent } from './edit-product/edit-product.component'

import { ShopRoutingModule } from './shop-routing.module'
import { AppPrimeNGModule } from '@/app-primeng.module'
import { SharedModule } from '@/shared/shared.module'

@NgModule({
  declarations: [
    ShopComponent,
    ProductListComponent,
    ProductPreviewComponent,
    ProductDetailsComponent,
    ProductFiltersComponent,
    ProductSearchComponent,
    ProductSortComponent,
    EditProductComponent,
  ],
  imports: [
    CommonModule,
    AppPrimeNGModule,
    ShopRoutingModule,
    PushModule,
    LetModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ShopModule {}
