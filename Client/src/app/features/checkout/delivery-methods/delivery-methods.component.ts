import { CheckoutService } from '@/services'
import { IDeliveryMethod } from '@/types'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-delivery-methods',
  templateUrl: './delivery-methods.component.html',
})
export class DeliveryMethodsComponent implements OnInit {
  methods: IDeliveryMethod[] = []
  selectedMethod: IDeliveryMethod | null = null

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.checkoutService
      .getDeliveryMethods()
      .subscribe((methodList) => (this.methods = methodList))
  }

  handleMethodChange(method: IDeliveryMethod) {
    this.selectedMethod = method
    console.log('method', method)
  }
}
