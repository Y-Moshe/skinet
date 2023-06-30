import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IDeliveryMethod } from '@/types'

import { RadioButtonModule } from 'primeng/radiobutton'

@Component({
  selector: 'app-checkout-deliveries',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioButtonModule],
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
