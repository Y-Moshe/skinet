import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IBasketItem } from '@/types'

@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
})
export class BasketListComponent {
  @Input() items: IBasketItem[] = []
  @Input() isLoading = false
  @Output() onItemChange = new EventEmitter<IBasketItem>()
  @Output() onItemRemove = new EventEmitter<number>()

  trackByItemId(index: number, item: IBasketItem) {
    return item.id!;
  }
}
