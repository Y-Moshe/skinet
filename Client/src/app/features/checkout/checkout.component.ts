import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { MenuItem } from 'primeng/api'

import { IAppState, selectors } from '@/store'
import { IBasketState } from '@/store/reducers/basket'
import { IUser } from '@/types'
import { CheckoutService, NotificationService } from '@/services'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit, OnDestroy {
  activeIndex = 0
  isLoading = false
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

  user!: IUser | null
  userSub!: Subscription
  bState!: IBasketState
  bStateSub!: Subscription

  constructor(
    private router: Router,
    private store$: Store<IAppState>,
    private checkoutService: CheckoutService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userSub = this.store$
      .select(selectors.selectLoggedInUser)
      .subscribe((user) => (this.user = user))

    this.bStateSub = this.store$
      .select(selectors.selectBasketState)
      .subscribe((state) => (this.bState = state))
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
    this.isLoading = true

    this.checkoutService
      .placeOrder({
        buyerEmail: this.user!.email,
        address: this.user!.address!,
        basketId: this.bState.basket.id!,
        deliveryMethodId: this.bState.selectedDeliveryMethod?.id!,
      })
      .subscribe({
        next: (order) => {
          this.handleStepsClick(true, {
            id: order.id,
            date: order.createdAt,
          })
        },
        error: (err) => {
          this.notificationService.notifyAtTopMiddle({
            sticky: true,
            severity: 'error',
            summary: 'Order failed',
            detail: err.message,
          })
        },
        complete: () => (this.isLoading = false),
      })
  }

  ngOnDestroy(): void {
    this.bStateSub.unsubscribe()
    this.userSub.unsubscribe()
  }
}
