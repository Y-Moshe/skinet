import { Component, OnInit, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, lastValueFrom, take } from 'rxjs'

import { IAppState, actions, selectors } from '@/store'
import { NotificationService, PaymentService } from '@/services'
import { IBasket } from '@/types'

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
})
export class OrderReviewComponent implements OnInit {
  private readonly store$ = inject(Store<IAppState>)
  private readonly paymentService = inject(PaymentService)
  private readonly notificationService = inject(NotificationService)

  basket$!: Observable<IBasket>

  ngOnInit(): void {
    this.basket$ = this.store$.select(selectors.selectBasket)
    this.createPaymentIntent()
  }

  async createPaymentIntent() {
    const basket = await lastValueFrom(this.basket$.pipe(take(1)))

    this.paymentService.createPaymentIntent(basket.id!).subscribe({
      next: (basket) => this.store$.dispatch(actions.updateBasket({ basket })),
      error: (err) =>
        this.notificationService.notifyAtBottomMiddle({
          summary: 'Payment API',
          detail: err.message,
          severity: 'error',
        }),
    })
  }
}
