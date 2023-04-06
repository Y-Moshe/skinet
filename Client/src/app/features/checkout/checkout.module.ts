import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { LetModule, PushModule } from '@ngrx/component'

import { AppPrimeNGModule } from '@/app-primeng.module'
import { SharedModule } from '@/shared/shared.module'
import { CheckoutComponent } from './checkout.component'
import { CheckoutRoutingModule } from './checkout-routing.module'
import { DeliveryMethodsComponent } from './delivery-methods/delivery-methods.component'
import { OrderReviewComponent } from './order-review/order-review.component'
import { ConfirmationComponent } from './confirmation/confirmation.component'

@NgModule({
  declarations: [
    CheckoutComponent,
    DeliveryMethodsComponent,
    OrderReviewComponent,
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    AppPrimeNGModule,
    FormsModule,
    PushModule,
    LetModule,
    SharedModule,
  ],
})
export class CheckoutModule {}
