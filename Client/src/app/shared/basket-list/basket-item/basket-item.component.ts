import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IBasketItem } from '@/types'

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
})
export class BasketItemComponent {
  @Input() item!: IBasketItem
  @Input() preview: boolean = false
  @Output() onChange = new EventEmitter<IBasketItem>()
  @Output() onRemove = new EventEmitter<number>()

  onQuantityChange(quantity: number) {
    this.onChange.emit({
      ...this.item,
      quantity,
    })
  }
}
