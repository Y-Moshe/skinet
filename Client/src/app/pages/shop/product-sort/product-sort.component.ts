import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'

@Component({
  selector: 'app-product-sort',
  standalone: true,
  imports: [FormsModule, DropdownModule],
  templateUrl: './product-sort.component.html',
})
export class ProductSortComponent {
  @Input() sortBy = ''
  @Output() onSortChange = new EventEmitter<string>()

  sortByOptions = [
    {
      label: 'A-z',
      value: 'a-z',
    },
    {
      label: 'Z-a',
      value: 'z-a',
    },
    {
      label: 'Low to High',
      value: 'low-high',
    },
    {
      label: 'High to Low',
      value: 'high-low',
    },
  ]
}
