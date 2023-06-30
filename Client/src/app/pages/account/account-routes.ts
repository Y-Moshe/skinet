import { Routes } from '@angular/router'

import { AccountComponent } from './account.component'
import { OrdersComponent } from './orders/orders.component'
import { OrderDetailsComponent } from './orders/order-details/order-details.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { FullNameTitleResolver } from './fullname-title.resolver'

import { RequireAuthGuard } from '@/guards/require-auth.guard'

export const accountRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
    canActivate: [RequireAuthGuard],
    pathMatch: 'full',
    title: FullNameTitleResolver,
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [RequireAuthGuard],
    title: 'Orders',
  },
  {
    path: 'orders/:id',
    component: OrderDetailsComponent,
    canActivate: [RequireAuthGuard],
    data: {
      breadcrumb: {
        alias: 'orderNumber',
      },
    },
  },
]
