import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AccountComponent } from './account.component'
import { OrdersComponent } from './orders/orders.component'
import { OrderDetailsComponent } from './orders/order-details/order-details.component'

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    pathMatch: 'full',
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'orders/:id',
    component: OrderDetailsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
