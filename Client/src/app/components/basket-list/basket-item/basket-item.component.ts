import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { ImageModule } from 'primeng/image'
import { TagModule } from 'primeng/tag'
import { InputNumberModule } from 'primeng/inputnumber'
import { ButtonModule } from 'primeng/button'

import { EllipsisTextPipe } from '@/pipes/ellipsis-text.pipe'
import { IBasketItem } from '@/types'

@Component({
  selector: 'app-basket-item',
  standalone: true,
  imports: [
    CommonModule,
    ImageModule,
    RouterModule,
    TagModule,
    EllipsisTextPipe,
    InputNumberModule,
    FormsModule,
    ButtonModule,
  ],
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
