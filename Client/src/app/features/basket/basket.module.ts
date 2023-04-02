import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { LetModule, PushModule } from '@ngrx/component'

import { BasketComponent } from './basket.component'
import { BasketRoutingModule } from './basket-routing.module'
import { AppPrimeNGModule } from '@/app-primeng.module'
import { SharedModule } from '@/shared/shared.module'

@NgModule({
  declarations: [BasketComponent],
  imports: [
    CommonModule,
    BasketRoutingModule,
    AppPrimeNGModule,
    FormsModule,
    PushModule,
    LetModule,
    SharedModule,
  ],
})
export class BasketModule {}
