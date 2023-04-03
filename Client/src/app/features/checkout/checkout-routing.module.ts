import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CheckoutComponent } from './checkout.component'
import { ConfirmationComponent } from './confirmation/confirmation.component'
import { OrderReviewComponent } from './order-review/order-review.component'
import { DeliveryMethodsComponent } from './delivery-methods/delivery-methods.component'
import { EditAddressComponent } from '@/shared/edit-address/edit-address.component'

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'address',
      },
      {
        path: 'address',
        component: EditAddressComponent,
      },
      {
        path: 'delivery',
        component: DeliveryMethodsComponent,
      },
      {
        path: 'review',
        component: OrderReviewComponent,
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
