import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { catchError, map, Observable, startWith } from 'rxjs'

import { NotificationService, ShopService } from '@/services'
import { IBasketItem, IErrorResponse, IProduct } from '@/types'
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
    private store$: Store<IAppState>,
    private notificationService: NotificationService,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.params['id']
    this.product$ = this.shopService.getProduct(productId).pipe(
      startWith(null),
      catchError(
        map((err: IErrorResponse) => {
          this.notificationService.notifyAtBottomMiddle({
            detail: err.message,
            severity: 'error',
          })

          return null
        })
      )
    )

    this.quantityLabel$ = this.store$.select(
      selectors.selectBasketItemQuantity(productId)
    )
  }

  handleAddToBasket(product: IProduct) {
    const item: IBasketItem = { ...product, quantity: this.quantity }
    this.store$.dispatch(actions.saveItemToBasket({ item, increase: true }))
  }
}
