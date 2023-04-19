import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { LetModule, PushModule } from '@ngrx/component'

import { AppPrimeNGModule } from '@/app-primeng.module'
import { SharedModule } from '@/shared/shared.module'
import { CheckoutRoutingModule } from './checkout-routing.module'

import { CheckoutComponent } from './checkout.component'
import { CheckoutDeliveriesComponent } from './checkout-deliveries/checkout-deliveries.component'
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component'
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component'
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component'

@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutDeliveriesComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent,
    CheckoutSuccessComponent,
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
