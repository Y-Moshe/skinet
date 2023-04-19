import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  inject,
} from '@angular/core'

import {
  Stripe,
  StripeCardNumberElement,
  StripeCardExpiryElement,
  StripeCardCvcElement,
  StripeCardElementOptions,
} from '@stripe/stripe-js'
import { MenuItem } from 'primeng/api'
import { NotificationService } from '@/services'

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

  clipboards: MenuItem[] = [
    {
      icon: 'pi pi-copy',
      label: 'Visa (valid)',
      command: this.copyToClipboard.bind(this),
      state: {
        num: '4242 4242 4242 4242',
      },
    },
    {
      icon: 'pi pi-copy',
      label: 'Stolen card decline',
      command: this.copyToClipboard.bind(this),
      state: {
        num: '4000 0000 0000 9979',
      },
    },
    {
      icon: 'pi pi-copy',
      label: 'Always authenticate',
      command: this.copyToClipboard.bind(this),
      state: {
        num: '4000 0027 6000 3184',
      },
    },
    {
      icon: 'pi pi-copy',
      label: 'Insufficient funds',
      command: this.copyToClipboard.bind(this),
      state: {
        num: '4000 0082 6000 3178',
      },
    },
  ]

  private readonly notificationService = inject(NotificationService)

  async copyToClipboard({ item }: any) {
    await navigator.clipboard.writeText(item.state.num)
    this.notificationService.notifyAtBottomMiddle({
      severity: 'success',
      summary: 'Clipboard',
      detail: 'Copied!',
    })
  }

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
