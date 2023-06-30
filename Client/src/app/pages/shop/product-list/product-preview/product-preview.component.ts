import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { Store } from '@ngrx/store'
import { PushModule } from '@ngrx/component'
import { Observable } from 'rxjs'

import { ImageModule } from 'primeng/image'
import { ButtonModule } from 'primeng/button'

import { IAppState, selectors } from '@/store'
import { IProduct } from '@/types'
import { EllipsisTextPipe } from '@/pipes/ellipsis-text.pipe'

import { environment } from 'src/environments/environment'
const { isEditMode } = environment

@Component({
  selector: 'app-product-preview',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ImageModule,
    ButtonModule,
    EllipsisTextPipe,
    PushModule,
  ],
  templateUrl: './product-preview.component.html',
})
export class ProductPreviewComponent implements OnInit {
  @Input() product!: IProduct
  @Input() isBasketLoading: boolean = false
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
      selectors.selectBasketItemQuantity(this.product.id!, '+')
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
