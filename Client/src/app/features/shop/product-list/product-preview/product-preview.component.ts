import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IProduct } from '@/types'

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
})
export class ProductPreviewComponent {
  @Input() product!: IProduct
  @Output() onAddToBasketClick = new EventEmitter<IProduct>()

  handleAddToBasketClick(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    this.onAddToBasketClick.emit(this.product)
  }
}
