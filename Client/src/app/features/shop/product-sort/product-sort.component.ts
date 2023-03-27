import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-product-sort',
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
