import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core'
import { Store } from '@ngrx/store'
import { lastValueFrom } from 'rxjs'

import { NotificationService, PaymentService } from '@/services'
import { IAppState, actions } from '@/store'
import { IBasketItem, IDeliveryMethod } from '@/types'
import { BasketListComponent, EditAddressComponent } from '@/components'

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [EditAddressComponent, BasketListComponent],
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
    this.createPaymentIntent()
  }

  async createPaymentIntent() {
    this.onLoadingChange.emit(true)
    try {
      const basket = await lastValueFrom(
        this.paymentService.createPaymentIntent(this.basketId)
      )
      this.store$.dispatch(actions.updateBasket({ basket }))
    } catch (err: any) {
      this.notificationService.notifyAtBottomMiddle({
        summary: 'Payment',
        detail: err.message,
        severity: 'error',
      })
    } finally {
      this.onLoadingChange.emit(false)
    }
  }
}
