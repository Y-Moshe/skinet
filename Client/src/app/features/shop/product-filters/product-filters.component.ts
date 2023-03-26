import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IProductBrand, IProductType } from '@/types'

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
})
export class ProductFiltersComponent {
  @Input() categories!: IProductType[]
  @Input() brands!: IProductBrand[]

  @Output() onCategoryChange = new EventEmitter<IProductType>()
  @Output() onBrandChange = new EventEmitter<IProductBrand>()
}
