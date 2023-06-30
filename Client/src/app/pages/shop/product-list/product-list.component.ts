import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IProduct } from '@/types'
import { ProductPreviewComponent } from './product-preview/product-preview.component'

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductPreviewComponent],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  @Input() products: IProduct[] = []
  @Input() isBasketLoading: boolean = false
  @Output() onAddToBasket = new EventEmitter<IProduct>()

  trackById(index: number, product: IProduct) {
    return product.id!
  }
}
