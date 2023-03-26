import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IBrand, ICategory } from '@/types'

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
})
export class ProductFiltersComponent {
  @Input() categories!: ICategory[]
  @Input() brands!: IBrand[]

  @Output() onCategoryChange = new EventEmitter<ICategory>()
  @Output() onBrandChange = new EventEmitter<IBrand>()
}
