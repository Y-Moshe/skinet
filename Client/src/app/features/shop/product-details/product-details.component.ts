import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { Observable, Subscription } from 'rxjs'

import { NotificationService } from '@/services'
import { actions, IAppState } from '@/store'
import { IProduct } from '@/types'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product$!: Observable<IProduct>
  productErrorSub!: Subscription
  quantity = 1

  constructor(
    private route: ActivatedRoute,
    private store$: Store<IAppState>,
    private actions$: Actions,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.params['id']
    this.store$.dispatch(actions.getProduct({ id: productId }))

    this.product$ = this.actions$.pipe(
      ofType(actions.getProductSuccessResponse)
    )
    this.productErrorSub = this.actions$
      .pipe(ofType(actions.getProductErrorResponse))
      .subscribe(({ message }) => {
        this.notificationService.notifyAtBottomMiddle({
          detail: message,
          severity: 'error',
        })
      })
  }

  handleAddToBasket() {
    console.log('TODO: Add to basket')
  }

  ngOnDestroy(): void {
    this.productErrorSub.unsubscribe()
  }
}
