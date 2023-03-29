import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { LetModule } from '@ngrx/component'

import { AccountComponent } from './account.component'
import { OrdersComponent } from './orders/orders.component'
import { AccountRoutingModule } from './account-routing.module'
import { AppPrimeNGModule } from '@/app-primeng.module'
import { SharedModule } from '@/shared/shared.module'

@NgModule({
  declarations: [AccountComponent, OrdersComponent],
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
