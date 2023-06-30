import { Routes } from '@angular/router'

import { HomeComponent } from '@/pages/home/home.component'
import { E404Component } from '@/pages/e404/e404.component'
import { RequireAuthGuard } from '@/guards/require-auth.guard'
import { CheckoutGuard } from '@/guards/checkout.guard'

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    title: 'Toyz',
    data: {
      breadcrumb: 'Home',
    },
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./pages/shop/shop-routes').then((_) => _.shopRoutes),
  },
  {
    path: 'basket',
    loadComponent: () =>
      import('./pages/basket/basket.component').then((_) => _.BasketComponent),
  },
  {
    path: 'checkout',
    canActivate: [RequireAuthGuard, CheckoutGuard],
    loadComponent: () =>
      import('./pages/checkout/checkout.component').then(
        (_) => _.CheckoutComponent
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./pages/account/account-routes').then((_) => _.accountRoutes),
  },
  {
    path: '**',
    component: E404Component,
    title: 'Not Found',
    data: {
      breadcrumb: 'Page Not Found',
    },
  },
]
