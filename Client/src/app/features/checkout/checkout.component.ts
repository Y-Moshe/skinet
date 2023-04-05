import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { IAppState, selectors } from '@/store'
import { MenuItem } from 'primeng/api'
import { IBasketState } from '@/store/reducers/basket'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit, OnDestroy {
  activeIndex = 0
  checkoutSteps: MenuItem[] = [
    {
      label: 'Address',
      routerLink: 'address',
    },
    {
      label: 'Delivery',
      routerLink: 'delivery',
    },
    {
      label: 'Review',
      routerLink: 'review',
    },
    {
      label: 'Confirmation',
      routerLink: 'confirmation',
    },
  ]

  bState!: IBasketState
  bStateSub!: Subscription

  constructor(private router: Router, private store$: Store<IAppState>) {}

  ngOnInit(): void {
    this.bStateSub = this.store$
      .select(selectors.selectBasketState)
      .subscribe((state) => (this.bState = state))
  }

  handleStepsClick(isNext: boolean) {
    const stepIdx = isNext ? this.activeIndex + 1 : this.activeIndex - 1
    const activeStep = this.checkoutSteps[stepIdx]
    if (!activeStep) return

    const nextRoute = activeStep.routerLink
    this.router.navigate(['/checkout/' + nextRoute], { replaceUrl: true })
    this.activeIndex += isNext ? 1 : -1
  }

  handlePlaceOrder() {
    console.log('Ordered')
  }

  ngOnDestroy(): void {
    this.bStateSub.unsubscribe()
  }
}
