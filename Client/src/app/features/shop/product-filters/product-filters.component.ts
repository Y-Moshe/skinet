import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IBrand, ICategory } from '@/types'

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
})
export class ProductFiltersComponent {
  @Input() categories!: ICategory[]
  @Input() brands!: IBrand[]
  @Input() selectedBrandIds!: number[] | string
  @Input() selectedCategoryId!: number

  @Output() onCategoryChange = new EventEmitter<number>()
  @Output() onBrandsChange = new EventEmitter<number[]>()
}
