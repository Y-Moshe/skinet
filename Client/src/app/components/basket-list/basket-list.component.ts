import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TableModule } from 'primeng/table'

import { BasketItemComponent } from './basket-item/basket-item.component'
import { IBasketItem } from '@/types'

@Component({
  selector: 'app-basket-list',
  standalone: true,
  imports: [CommonModule, TableModule, BasketItemComponent],
  templateUrl: './basket-list.component.html',
})
export class BasketListComponent {
  @Input() items: IBasketItem[] = []
  @Input() isLoading: boolean = false
  @Input() previewItems: boolean = false
  @Output() onItemChange = new EventEmitter<IBasketItem>()
  @Output() onItemRemove = new EventEmitter<number>()

  trackByItemId(index: number, item: IBasketItem) {
    return item.id!
  }
}
