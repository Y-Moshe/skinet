import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LetModule } from '@ngrx/component'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { IAppState, actions, selectors } from '@/store'
import { IBasket, IBasketItem } from '@/types'
import { BasketListComponent, OrderSummaryComponent } from '@/components'

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    BasketListComponent,
    OrderSummaryComponent,
  ],
  templateUrl: './basket.component.html',
})
export class BasketComponent implements OnInit {
  basket$!: Observable<IBasket>
  itemsCount$!: Observable<number>
  subtotal$!: Observable<number>
  isLoading$!: Observable<boolean>

  constructor(private store$: Store<IAppState>) {}

  ngOnInit(): void {
    this.basket$ = this.store$.select(selectors.selectBasket)
    this.itemsCount$ = this.store$.select(selectors.selectBasketItemsCount)
    this.subtotal$ = this.store$.select(selectors.selectBasketSubtotal)
    this.isLoading$ = this.store$.select(selectors.selectIsBasketLoading)
  }

  handleRemoveItem(itemId: number) {
    this.store$.dispatch(actions.removeItemFromBasket({ itemId }))
  }

  handleItemChange(item: IBasketItem) {
    this.store$.dispatch(actions.saveItemToBasket({ item, setQuantity: true }))
  }
}
