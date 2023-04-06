import { Component, OnInit, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'

import { IAppState, actions } from '@/store'
import { IBasketState } from '@/store/reducers/basket'

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent implements OnInit {
  bState!: IBasketState
  orderNumber!: number
  orderDate!: Date

  private readonly store$ = inject(Store<IAppState>)
  private readonly route = inject(ActivatedRoute)

  ngOnInit(): void {
    this.orderNumber = this.route.snapshot.queryParams['id']
    this.orderDate = this.route.snapshot.queryParams['date']
    this.bState = this.route.snapshot.data['basketState']

    this.store$.dispatch(actions.deleteBasket({ id: this.bState.basket.id! }))
  }
}
