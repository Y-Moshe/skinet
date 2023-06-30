import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { LetModule } from '@ngrx/component'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { IAppState, actions, selectors } from '@/store'
import { IOrder } from '@/types'

import { CardModule } from 'primeng/card'
import { OrderItemPreviewComponent } from './order-item-preview/order-item-preview.component'

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    LetModule,
    OrderItemPreviewComponent,
  ],
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
