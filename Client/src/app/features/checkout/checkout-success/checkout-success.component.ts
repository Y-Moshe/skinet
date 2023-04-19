import { Component, Input, OnInit, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, take } from 'rxjs'

import { IAppState, selectors } from '@/store'
import { IBasketState } from '@/store/reducers/basket'
import { IOrder } from '@/types'

@Component({
  selector: 'app-checkout-success',
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
    this.basketState$ = this.store$.select(selectors.selectBasketState).pipe(take(1))
  }
}
