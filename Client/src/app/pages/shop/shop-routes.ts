import { Routes } from '@angular/router'

import { ProductDetailsComponent } from './product-details/product-details.component'
import { EditProductComponent } from './edit-product/edit-product.component'
import { ShopComponent } from './shop.component'
import { ProductResolver } from './product.resolver'

export const shopRoutes: Routes = [
  {
    path: '',
    component: ShopComponent,
    pathMatch: 'full',
    title: 'Shop',
  },
  {
    path: 'edit/:id',
    component: EditProductComponent,
    data: {
      breadcrumb: {
        alias: 'productName',
      },
    },
    resolve: {
      product: ProductResolver,
    },
  },
  {
    path: 'edit',
    component: EditProductComponent,
    data: {
      breadcrumb: {
        alias: 'productName',
      },
    },
    resolve: {
      product: ProductResolver,
    },
  },
  {
    path: ':id',
    component: ProductDetailsComponent,
    data: {
      breadcrumb: {
        alias: 'productName',
      },
    },
    resolve: {
      product: ProductResolver,
    },
  },
]
