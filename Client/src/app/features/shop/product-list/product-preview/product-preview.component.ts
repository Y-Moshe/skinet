import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { IAppState, selectors } from '@/store'
import { IProduct } from '@/types'

import { environment } from 'src/environments/environment'
const { isEditMode } = environment

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
})
export class ProductPreviewComponent implements OnInit {
  @Input() product!: IProduct
  @Output() onAddToBasketClick = new EventEmitter<IProduct>()

  quantityLabel$!: Observable<string>

  get isEditMode(): boolean {
    return isEditMode
  }

  get editProductLink() {
    return `/shop/edit/${this.product.id!}`
  }

  private readonly store$ = inject(Store<IAppState>)

  ngOnInit(): void {
    this.quantityLabel$ = this.store$.select(
      selectors.selectBasketItemQuantity(this.product.id!)
    )
  }

  preventDefault(event: Event): void {
    event.preventDefault()
    event.stopPropagation()
  }

  handleAddToBasketClick(event: Event) {
    this.preventDefault(event)
    this.onAddToBasketClick.emit(this.product)
  }
}
