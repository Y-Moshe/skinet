import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
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

  constructor(private router: Router) {}

  handleStepsClick(isNext: boolean) {
    const stepIdx = isNext ? this.activeIndex + 1 : this.activeIndex - 1
    const activeStep = this.checkoutSteps[stepIdx]
    if (!activeStep) return

    const nextRoute = activeStep.routerLink
    this.router.navigate(['/checkout/' + nextRoute], { replaceUrl: true })
    this.activeIndex += isNext ? 1 : -1
  }
}
