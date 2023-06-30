import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { IOrderItem } from '@/types'

import { ImageModule } from 'primeng/image'
import { EllipsisTextPipe } from '@/pipes/ellipsis-text.pipe'

@Component({
  selector: 'app-order-item-preview',
  standalone: true,
  imports: [CommonModule, RouterModule, ImageModule, EllipsisTextPipe],
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
