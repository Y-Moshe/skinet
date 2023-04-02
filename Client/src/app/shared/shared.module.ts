import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { CommonInputComponent } from './common-input/common-input.component'
import { BlockableDiv } from './blockable-div/blockable-div.component'
import { OrderSummaryComponent } from './order-summary/order-summary.component'
import { AppPrimeNGModule } from '@/app-primeng.module'

@NgModule({
  declarations: [CommonInputComponent, BlockableDiv, OrderSummaryComponent],
  imports: [CommonModule, AppPrimeNGModule, ReactiveFormsModule],
  exports: [CommonInputComponent, BlockableDiv, OrderSummaryComponent],
})
export class SharedModule {}
