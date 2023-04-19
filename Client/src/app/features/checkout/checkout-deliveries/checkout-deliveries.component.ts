import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IDeliveryMethod } from '@/types'

@Component({
  selector: 'app-checkout-deliveries',
  templateUrl: './checkout-deliveries.component.html',
})
export class CheckoutDeliveriesComponent {
  @Input() methods!: IDeliveryMethod[]
  @Input() selectedMethodId?: number

  @Output() onMethodChange = new EventEmitter<IDeliveryMethod>()

  handleMethodChange(methodId: number): void {
    const method = this.methods.find((m) => m.id === methodId)
    method && this.onMethodChange.emit(method)
  }
}
