import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { MenuItem } from 'primeng/api'
import { Observable, Subscription } from 'rxjs'

import { IAppState, actions, selectors } from '@/store'
import { IBasketState } from '@/store/reducers/basket'
import { NotificationService } from '@/services'
import { IAddress } from '@/types'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit, OnDestroy {
  activeIndex = 0
  checkoutSteps: MenuItem[] = [
    {
      label: 'Address',
      routerLink: 'address',
    },
    {
      label: 'Delivery',
      routerLink: 'delivery',
    },
    {
      label: 'Review order',
      routerLink: 'review',
    },
    {
      label: 'Confirmation',
      routerLink: 'confirmation',
    },
  ]

  bState!: IBasketState
  bStateSub!: Subscription

  userAddress$!: Observable<IAddress | undefined>
  isPlacingOrder$!: Observable<boolean>
  orderSuccessSub!: Subscription
  orderFailedSub!: Subscription

  private readonly router = inject(Router)
  private readonly store$ = inject(Store<IAppState>)
  private readonly actions$ = inject(Actions)
  private readonly notificationService = inject(NotificationService)

  ngOnInit(): void {
    // Protection aginst refeshing at middle of checkout process
    this.router.navigate(['/checkout/address'])

    this.isPlacingOrder$ = this.store$.select(selectors.selectIsPlacingOrder)
    this.userAddress$ = this.store$.select(selectors.selectUserAddress)

    this.bStateSub = this.store$
      .select(selectors.selectBasketState)
      .subscribe((state) => (this.bState = state))

    this.orderSuccessSub = this.actions$
      .pipe(ofType(actions.placeOrderSuccess))
      .subscribe(({ order }) => {
        this.handleStepsClick(true, {
          id: order.id,
          date: order.createdAt,
        })
      })

    this.orderFailedSub = this.actions$
      .pipe(ofType(actions.placeOrderFailed))
      .subscribe((err) => {
        this.notificationService.notifyAtTopMiddle({
          sticky: true,
          severity: 'error',
          summary: 'Order failed',
          detail: err.message,
        })
      })
  }

  handleStepsClick(isNext: boolean, queryParams: any = null) {
    const stepIdx = isNext ? this.activeIndex + 1 : this.activeIndex - 1
    const activeStep = this.checkoutSteps[stepIdx]
    if (!activeStep) return

    const nextRoute = activeStep.routerLink
    this.router.navigate(['/checkout/' + nextRoute], {
      replaceUrl: true,
      queryParams,
    })
    this.activeIndex += isNext ? 1 : -1
  }

  handlePlaceOrder() {
    this.store$.dispatch(actions.placeOrder())
  }

  ngOnDestroy(): void {
    this.bStateSub.unsubscribe()
    this.orderSuccessSub.unsubscribe()
    this.orderFailedSub.unsubscribe()
  }
}
