import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { IAppState, selectors } from '@/store'
import { IProduct } from '@/types'

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
})
export class ProductPreviewComponent implements OnInit {
  @Input() product!: IProduct
  @Output() onAddToBasketClick = new EventEmitter<IProduct>()

  quantityLabel$!: Observable<string>

  constructor(private store$: Store<IAppState>) {}

  ngOnInit(): void {
    this.quantityLabel$ = this.store$.select(
      selectors.selectBasketItemQuantity(this.product.id!)
    )
  }

  handleAddToBasketClick(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    this.onAddToBasketClick.emit(this.product)
  }
}
