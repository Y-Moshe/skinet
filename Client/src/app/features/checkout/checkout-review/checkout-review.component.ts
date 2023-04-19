import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core'
import { Store } from '@ngrx/store'

import { NotificationService, PaymentService } from '@/services'
import { IAppState, actions } from '@/store'
import { IBasketItem, IDeliveryMethod } from '@/types'

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
})
export class CheckoutReviewComponent implements OnInit {
  @Input() basketId!: string
  @Input() basketItems: IBasketItem[] = []
  @Input() selectedDeliveryMethod!: IDeliveryMethod
  @Output() onLoadingChange = new EventEmitter(false)

  private readonly store$ = inject(Store<IAppState>)
  private readonly paymentService = inject(PaymentService)
  private readonly notificationService = inject(NotificationService)

  ngOnInit(): void {
    this.onLoadingChange.emit(false)
    this.paymentService.createPaymentIntent(this.basketId).subscribe({
      next: (basket) => this.store$.dispatch(actions.updateBasket({ basket })),
      error: (err) =>
        this.notificationService.notifyAtBottomMiddle({
          summary: 'Payment',
          detail: err.message,
          severity: 'error',
        }),
      complete: () => this.onLoadingChange.emit(true),
    })
  }
}
