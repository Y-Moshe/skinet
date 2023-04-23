import { Component, Input } from '@angular/core'
import { IOrderItem } from '@/types'

@Component({
  selector: 'app-order-item-preview',
  templateUrl: './order-item-preview.component.html',
})
export class OrderItemPreviewComponent {
  @Input() item!: IOrderItem
  @Input() useDetailsTemplate: boolean = false
  @Input() ellipsisText: boolean = true

  get productLink() {
    return '/shop/' + this.item.productId
  }

  getDescParagraphs(description: string, limit?: number) {
    return description.split(/\.|•|!/i, limit)
  }
}
