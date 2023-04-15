import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CheckoutComponent } from './checkout.component'
import { ConfirmationComponent } from './confirmation/confirmation.component'
import { OrderReviewComponent } from './order-review/order-review.component'
import { DeliveryMethodsComponent } from './delivery-methods/delivery-methods.component'
import { EditAddressComponent } from '@/shared/edit-address/edit-address.component'
import { ConfirmationResolver } from './confirmation/confirmation.resolver'

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
        title: 'Checkout',
      },
      {
        path: 'delivery',
        component: DeliveryMethodsComponent,
        title: 'Delivery',
      },
      {
        path: 'review',
        component: OrderReviewComponent,
        title: 'Order review',
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent,
        title: 'Order confirmation',
        resolve: {
          basketState: ConfirmationResolver,
        },
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
