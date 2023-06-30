import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AccordionModule } from 'primeng/accordion'
import { ListboxModule } from 'primeng/listbox'
import { IBrand, ICategory } from '@/types'

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [FormsModule, AccordionModule, ListboxModule],
  templateUrl: './product-filters.component.html',
})
export class ProductFiltersComponent {
  @Input() categories!: ICategory[]
  @Input() brands!: IBrand[]
  @Input() selectedBrandIds!: number[] | string
  @Input() selectedCategoryId!: number

  @Output() onCategoryChange = new EventEmitter<number>()
  @Output() onBrandsChange = new EventEmitter<number[]>()

  handleCategoryChange(categoryId: number) {
    if (categoryId === this.selectedCategoryId) categoryId = 0 // Allow toggle
    this.onCategoryChange.emit(categoryId)
  }
}
