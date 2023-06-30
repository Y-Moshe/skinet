import { Component, Input, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { Store } from '@ngrx/store'
import { LetModule } from '@ngrx/component'
import { Observable, take } from 'rxjs'

import { IAppState, selectors } from '@/store'
import { IBasketState } from '@/store/reducers/basket'
import { IOrder } from '@/types'

import { BasketItemComponent, OrderSummaryComponent } from '@/components'
import { MessageModule } from 'primeng/message'
import { CardModule } from 'primeng/card'

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LetModule,
    CardModule,
    MessageModule,
    BasketItemComponent,
    OrderSummaryComponent,
  ],
  templateUrl: './checkout-success.component.html',
})
export class CheckoutSuccessComponent implements OnInit {
  @Input() order: IOrder | null = null
  basketState$!: Observable<IBasketState>

  get orderLink(): string {
    return '/account/orders/' + this.order?.id
  }

  private readonly store$ = inject(Store<IAppState>)

  ngOnInit(): void {
    this.basketState$ = this.store$
      .select(selectors.selectBasketState)
      .pipe(take(1))
  }
}
