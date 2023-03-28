import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IProduct } from '@/types'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  @Input() products: IProduct[] = []
  @Output() onAddToBasket = new EventEmitter<IProduct>()

  trackById(index: number, product: IProduct) {
    return product.id!
  }
}
