import { Component, OnInit, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { IAppState, actions, selectors } from '@/store'
import { IOrder } from '@/types'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  private readonly store$ = inject(Store<IAppState>)
  orders$!: Observable<IOrder[]>

  ngOnInit(): void {
    this.store$.dispatch(actions.loadUserOrders())
    this.orders$ = this.store$.select(selectors.selectUserOrders)
  }
}
