import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { LetModule } from '@ngrx/component'

import { AccountComponent } from './account.component'
import { OrdersComponent } from './orders/orders.component'
import { OrderDetailsComponent } from './orders/order-details/order-details.component'

import { AccountRoutingModule } from './account-routing.module'
import { AppPrimeNGModule } from '@/app-primeng.module'
import { SharedModule } from '@/shared/shared.module';
import { OrderItemPreviewComponent } from './orders/order-item-preview/order-item-preview.component'

@NgModule({
  declarations: [AccountComponent, OrdersComponent, OrderDetailsComponent, OrderItemPreviewComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    LetModule,
    ReactiveFormsModule,
    AppPrimeNGModule,
    SharedModule,
  ],
})
export class AccountModule {}
