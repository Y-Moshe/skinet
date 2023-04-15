import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { map, Observable } from 'rxjs'

import { IBasketItem, IProduct } from '@/types'
import { actions, IAppState, selectors } from '@/store'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<IProduct | null>
  quantityLabel$!: Observable<string>
  quantity = 1

  constructor(
    private route: ActivatedRoute,
    private store$: Store<IAppState>
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.params['id']
    this.product$ = this.route.data.pipe(map((data: any) => data.product))

    this.quantityLabel$ = this.store$.select(
      selectors.selectBasketItemQuantity(productId)
    )
  }

  handleAddToBasket(product: IProduct) {
    const item: IBasketItem = { ...product, quantity: this.quantity }
    this.store$.dispatch(actions.saveItemToBasket({ item, setQuantity: false }))
  }
}
