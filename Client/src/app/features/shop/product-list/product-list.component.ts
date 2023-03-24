import { Component, Input } from '@angular/core'
import { IProduct } from '@/types'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  @Input() products: IProduct[] = []
}
