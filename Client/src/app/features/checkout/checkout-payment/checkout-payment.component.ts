import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core'

import {
  Stripe,
  StripeCardNumberElement,
  StripeCardExpiryElement,
  StripeCardCvcElement,
  StripeCardElementOptions,
} from '@stripe/stripe-js'

export type PaymentValues = {
  name: string
  card: StripeCardNumberElement
}

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardNumber') cardNumberElement?: ElementRef
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef
  @ViewChild('cardCvc') cardCvcElement?: ElementRef

  @Input() hidden: boolean = false
  @Input() stripeService: Stripe | null = null
  nameOnCard: string = ''
  cardNumber?: StripeCardNumberElement
  cardExpiry?: StripeCardExpiryElement
  cardCvc?: StripeCardCvcElement
  isCardNumberValid = false
  isCardExpiryValid = false
  isCardCvcValid = false
  errorMsg: string | null = null

  @Output() onContinueOrder = new EventEmitter<PaymentValues>()

  get isPaymentValid() {
    return (
      this.nameOnCard.trim() &&
      this.isCardNumberValid &&
      this.isCardExpiryValid &&
      this.isCardCvcValid
    )
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.setupStripeElements(), 100)
  }

  setupStripeElements() {
    const elClassOpts: StripeCardElementOptions = {
      classes: { base: 'p-inputtext w-100', focus: 'stripe-focus' },
    }
    const elements = this.stripeService?.elements()
    if (elements) {
      this.cardNumber = elements.create('cardNumber', {
        ...elClassOpts,
        showIcon: true,
        iconStyle: 'solid',
        placeholder: '4242 4242 4242 4242',
      })
      this.cardNumber.mount(this.cardNumberElement?.nativeElement)
      this.cardNumber.on('change', (event) => {
        this.isCardNumberValid = event.complete
        if (event.error) this.errorMsg = event.error.message
        else this.errorMsg = null
      })

      this.cardExpiry = elements.create('cardExpiry', elClassOpts)
      this.cardExpiry.mount(this.cardExpiryElement?.nativeElement)
      this.cardExpiry.on('change', (event) => {
        this.isCardExpiryValid = event.complete
        if (event.error) this.errorMsg = event.error.message
        else this.errorMsg = null
      })

      this.cardCvc = elements.create('cardCvc', elClassOpts)
      this.cardCvc.mount(this.cardCvcElement?.nativeElement)
      this.cardCvc.on('change', (event) => {
        this.isCardCvcValid = event.complete
        if (event.error) this.errorMsg = event.error.message
        else this.errorMsg = null
      })
    }
  }

  handleContinueClick() {
    this.onContinueOrder.emit({
      name: this.nameOnCard,
      card: this.cardNumber!,
    })
  }

  ngOnDestroy(): void {
    this.cardNumber?.unmount()
    this.cardExpiry?.unmount()
    this.cardCvc?.unmount()
  }
}
