import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { MenuItem } from 'primeng/api'
import { Stripe, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js'
import { Observable, Subscription } from 'rxjs'

import { IAppState, actions, selectors } from '@/store'
import { IBasketState } from '@/store/reducers/basket'
import { NotificationService } from '@/services'
import { IAddress, IDeliveryMethod, IOrder } from '@/types'
import { PaymentValues } from './checkout-payment/checkout-payment.component'

import { environment } from 'src/environments/environment'
const { stripePublisableKey } = environment

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
  stripeService: Stripe | null = null
  nameOnCard: string = ''
  cardNumber?: StripeCardNumberElement

  private readonly store$ = inject(Store<IAppState>)
  private readonly actions$ = inject(Actions)
  private readonly notificationService = inject(NotificationService)

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
    this.loadStripeService()
    this.store$.dispatch(actions.loadDeliveryMethods())
    this.methods$ = this.store$.select(selectors.selectDeliveryMethods)

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
          detail: err.message,
        })
      })
  }

  async loadStripeService() {
    try {
      const stripe = await loadStripe(stripePublisableKey)
      this.stripeService = stripe
    } catch (error) {
      console.log('Falied to load stripe', error)
    }
  }

  handleMoveStep(isNext: boolean) {
    this.activeIndex += isNext ? 1 : -1
  }

  isNextBtnDisabled(userAddress: IAddress | undefined): boolean {
    return (
      (this.isInAddressStep && !userAddress) ||
      (this.isInMethodsStep && !this.bState.basket.deliveryMethodId) ||
      (this.isInReviewStep && this.isReviewLoading)
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
      const result = await this.stripeService?.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: this.cardNumber!,
            billing_details: {
              name: this.nameOnCard,
            },
          },
        }
      )

      if (result?.error) throw result.error
      this.handleMoveStep(true)
      this.store$.dispatch(actions.deleteBasket({ id: this.bState.basket.id! }))
    } catch (error: any) {
      this.notificationService.notifyAtTopMiddle({
        summary: 'Order fail',
        detail: error.message,
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
