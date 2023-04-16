import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './core/home/home.component'
import { E404Component } from './core/e404/e404.component'
import { RequireAuthGuard } from './core/guards/require-auth.guard'
import { CheckoutGuard } from './core/guards/checkout.guard'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    title: 'T-Toys',
    data: {
      breadcrumb: 'Home',
    },
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./features/shop/shop.module').then((_) => _.ShopModule),
  },
  {
    path: 'basket',
    loadChildren: () =>
      import('./features/basket/basket.module').then((_) => _.BasketModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((_) => _.AuthModule),
  },
  {
    path: 'checkout',
    canActivate: [RequireAuthGuard, CheckoutGuard],
    loadChildren: () =>
      import('./features/checkout/checkout.module').then(
        (_) => _.CheckoutModule
      ),
  },
  {
    path: 'account',
    canActivate: [RequireAuthGuard],
    loadChildren: () =>
      import('./features/account/account.module').then((_) => _.AccountModule),
  },
  {
    path: '**',
    component: E404Component,
    title: 'Not Found',
    data: {
      breadcrumb: 'Page Not Found'
    }
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
