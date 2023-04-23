import { Component, OnInit, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { BreadcrumbService } from 'xng-breadcrumb'
import { map, Observable, tap } from 'rxjs'

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

  private readonly route = inject(ActivatedRoute)
  private readonly store$ = inject(Store<IAppState>)
  private readonly breadcrumbService = inject(BreadcrumbService)

  ngOnInit(): void {
    const productId = +this.route.snapshot.params['id']
    this.product$ = this.route.data.pipe(
      map((data: any) => data.product),
      tap((product) =>
        this.breadcrumbService.set('@productName', product!.name)
      )
    )

    this.quantityLabel$ = this.store$.select(
      selectors.selectBasketItemQuantity(productId)
    )
  }

  getDescParagraphs(description: string) {
    return description.split(/\.|•|!/i)
  }

  handleAddToBasket(product: IProduct) {
    const item: IBasketItem = { ...product, quantity: this.quantity }
    this.store$.dispatch(actions.saveItemToBasket({ item, setQuantity: false }))
  }
}
