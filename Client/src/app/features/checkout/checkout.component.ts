import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { StripeCardNumberElement } from '@stripe/stripe-js'
import { StripeService } from 'ngx-stripe'
import { MenuItem } from 'primeng/api'
import { Observable, Subscription, lastValueFrom, tap } from 'rxjs'

import { IAppState, actions, selectors } from '@/store'
import { IBasketState } from '@/store/reducers/basket'
import { NotificationService } from '@/services'
import { IAddress, IDeliveryMethod, IOrder } from '@/types'
import { PaymentValues } from './checkout-payment/checkout-payment.component'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit, OnDestroy {
  activeIndex = 0
  checkoutSteps: MenuItem[] = [
    {
      label: 'Address',
    },
    {
      label: 'Delivery',
    },
    {
      label: 'Payment',
    },
    {
      label: 'Review',
    },
    {
      label: 'Completed',
    },
  ]

  methods$!: Observable<IDeliveryMethod[]>
  userAddress$!: Observable<IAddress | undefined>
  isPlacingOrder$!: Observable<boolean>

  isReviewLoading = false
  isPaymentProccessing = false
  bState!: IBasketState
  bStateSub!: Subscription
  orderSuccessSub!: Subscription
  orderFailedSub!: Subscription

  placedOrder: IOrder | null = null
  nameOnCard: string = ''
  cardNumber?: StripeCardNumberElement

  private readonly store$ = inject(Store<IAppState>)
  private readonly actions$ = inject(Actions)
  private readonly notificationService = inject(NotificationService)
  private readonly stripeService = inject(StripeService)

  get isInAddressStep() {
    return this.activeIndex === 0
  }
  get isInMethodsStep() {
    return this.activeIndex === 1
  }
  get isInPaymentStep() {
    return this.activeIndex === 2
  }
  get isInReviewStep() {
    return this.activeIndex === 3
  }
  get isInCompletedStep() {
    return this.activeIndex === 4
  }

  ngOnInit(): void {
    this.store$.dispatch(actions.loadDeliveryMethods())
    this.methods$ = this.store$
      .select(selectors.selectDeliveryMethods)
      .pipe(tap((methods) => this.loadSelectedDeliveryMethod(methods)))

    this.isPlacingOrder$ = this.store$.select(selectors.selectIsPlacingOrder)
    this.userAddress$ = this.store$.select(selectors.selectUserAddress)

    this.bStateSub = this.store$
      .select(selectors.selectBasketState)
      .subscribe((state) => (this.bState = state))

    this.orderSuccessSub = this.actions$
      .pipe(ofType(actions.placeOrderSuccess))
      .subscribe(({ order }) => this.handlePlaceOrderSuccess(order))

    this.orderFailedSub = this.actions$
      .pipe(ofType(actions.placeOrderFailed))
      .subscribe((err) => {
        this.notificationService.notifyAtTopMiddle({
          sticky: true,
          severity: 'error',
          summary: 'Order failed',
          detail: err?.message || 'Unknown error, please try again',
        })
      })
  }

  loadSelectedDeliveryMethod(methods: IDeliveryMethod[]) {
    const selectedId = this.bState.basket.deliveryMethodId
    if (selectedId) {
      const method = methods.find((m) => m.id === selectedId)
      method && this.store$.dispatch(actions.setDeliveryMethod({ method }))
    }
  }

  handleMoveStep(isNext: boolean) {
    this.activeIndex += isNext ? 1 : -1
  }

  isNextBtnDisabled(userAddress: IAddress | undefined): boolean {
    return (
      (this.isInAddressStep && !userAddress) ||
      (this.isInMethodsStep && !this.bState.selectedDeliveryMethod)
    )
  }

  handleDeliveryMethodChange(method: IDeliveryMethod) {
    this.store$.dispatch(actions.setDeliveryMethod({ method }))
  }

  handleIsReviewLoading(isLoading: boolean) {
    this.isReviewLoading = isLoading
  }

  handleContinueClick({ name, card }: PaymentValues) {
    this.nameOnCard = name
    this.cardNumber = card
    this.handleMoveStep(true)
  }

  handlePlaceOrder() {
    this.store$.dispatch(actions.placeOrder())
  }

  async handlePlaceOrderSuccess(order: IOrder) {
    this.isPaymentProccessing = true
    this.placedOrder = order
    const clientSecret = this.bState.basket.clientSecret!

    try {
      const result = await lastValueFrom(
        this.stripeService.confirmCardPayment(clientSecret, {
          payment_method: {
            card: this.cardNumber!,
            billing_details: {
              name: this.nameOnCard,
            },
          },
        })
      )

      if (result?.error) throw result.error
      this.handleMoveStep(true)
      this.store$.dispatch(actions.deleteBasket({ id: this.bState.basket.id! }))
    } catch (error: any) {
      this.notificationService.notifyAtTopMiddle({
        summary: 'Order failed',
        detail: error?.message || 'Unknown error, please try again',
        severity: 'error',
        sticky: true,
      })
    } finally {
      this.isPaymentProccessing = false
    }
  }

  ngOnDestroy(): void {
    this.bStateSub.unsubscribe()
    this.orderSuccessSub.unsubscribe()
    this.orderFailedSub.unsubscribe()
  }
}
