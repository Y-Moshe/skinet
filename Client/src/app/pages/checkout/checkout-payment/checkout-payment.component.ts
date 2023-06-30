import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import {
  StripeCardNumberElement,
  StripeCardElementOptions,
  StripeCardNumberElementOptions,
  StripeElementChangeEvent,
} from '@stripe/stripe-js'
import { NgxStripeModule, StripeCardNumberComponent } from 'ngx-stripe'

import { NotificationService } from '@/services'
import { MenuItem } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { MenuModule } from 'primeng/menu'
import { InputTextModule } from 'primeng/inputtext'

export type PaymentValues = {
  name: string
  card: StripeCardNumberElement
}

@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxStripeModule,
    ButtonModule,
    MenuModule,
    InputTextModule,
  ],
  templateUrl: './checkout-payment.component.html',
})
export class CheckoutPaymentComponent {
  @Input() hidden: boolean = false

  @ViewChild(StripeCardNumberComponent) card!: StripeCardNumberComponent
  stripeElementOptions: StripeCardElementOptions = {
    classes: { base: 'p-inputtext w-100', focus: 'stripe-focus' },
  }
  stripeCardNumberOptions: StripeCardNumberElementOptions = {
    ...this.stripeElementOptions,
    showIcon: true,
    iconStyle: 'solid',
    placeholder: '4242 4242 4242 4242',
  }

  nameOnCard: string = ''
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

  handleStripeElementChange(event: StripeElementChangeEvent) {
    switch (event.elementType) {
      case 'cardNumber':
        this.isCardNumberValid = event.complete
        break
      case 'cardExpiry':
        this.isCardExpiryValid = event.complete
        break
      case 'cardCvc':
        this.isCardCvcValid = event.complete
        break
    }

    this.errorMsg = event?.error ? event.error.message : null
  }

  handleContinueClick() {
    this.onContinueOrder.emit({
      name: this.nameOnCard,
      card: this.card?.element,
    })
  }
}
