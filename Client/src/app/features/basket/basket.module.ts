import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { LetModule, PushModule } from '@ngrx/component'

import { BasketComponent } from './basket.component'
import { BasketListComponent } from './basket-list/basket-list.component'
import { BasketItemComponent } from './basket-item/basket-item.component'

import { BasketRoutingModule } from './basket-routing.module'
import { AppPrimeNGModule } from '@/app-primeng.module'
import { SharedModule } from '@/shared/shared.module'

@NgModule({
  declarations: [BasketComponent, BasketListComponent, BasketItemComponent],
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
