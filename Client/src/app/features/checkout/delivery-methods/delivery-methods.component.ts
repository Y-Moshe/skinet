import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'

import { IDeliveryMethod } from '@/types'
import { IAppState, actions, selectors } from '@/store'

@Component({
  selector: 'app-delivery-methods',
  templateUrl: './delivery-methods.component.html',
})
export class DeliveryMethodsComponent implements OnInit, OnDestroy {
  methods$!: Observable<IDeliveryMethod[]>
  selectedMethod: number | null = null
  selectedMethodSub!: Subscription

  private readonly store$ = inject(Store<IAppState>)

  ngOnInit(): void {
    this.store$.dispatch(actions.loadDeliveryMethods())
    this.methods$ = this.store$.select(selectors.selectDeliveryMethods)

    this.selectedMethodSub = this.store$
      .select(selectors.selectDeliveryMethod)
      .subscribe((method) => (this.selectedMethod = method?.id || null))
  }

  handleMethodChange(methodId: number, methods: IDeliveryMethod[]): void {
    const method = methods.find((m) => m.id === methodId)
    method && this.store$.dispatch(actions.setDeliveryMethod({ method }))
  }

  ngOnDestroy(): void {
    this.selectedMethodSub.unsubscribe()
  }
}
