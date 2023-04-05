import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import { CheckoutService } from '@/services'
import { IDeliveryMethod } from '@/types'
import { IAppState, actions, selectors } from '@/store'
import { Subscription, tap } from 'rxjs'

@Component({
  selector: 'app-delivery-methods',
  templateUrl: './delivery-methods.component.html',
})
export class DeliveryMethodsComponent implements OnInit, OnDestroy {
  methods: IDeliveryMethod[] = []
  selectedMethod: number | null = null
  selectedMethodSub!: Subscription

  constructor(
    private checkoutService: CheckoutService,
    private store$: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.checkoutService
      .getDeliveryMethods()
      .subscribe((methodList) => (this.methods = methodList))

    this.selectedMethodSub = this.store$
      .select(selectors.selectDeliveryMethod)
      .subscribe((method) => (this.selectedMethod = method?.id || null))
  }

  handleMethodChange(methodId: number) {
    const method = this.methods.find((m) => m.id === methodId)
    method && this.store$.dispatch(actions.setDeliveryMethod({ method }))
  }

  ngOnDestroy(): void {
    this.selectedMethodSub.unsubscribe()
  }
}
