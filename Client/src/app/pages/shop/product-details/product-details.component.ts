import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { LetModule, PushModule } from '@ngrx/component'
import { BreadcrumbService } from 'xng-breadcrumb'
import { map, Observable, tap } from 'rxjs'

import { ProgressBarModule } from 'primeng/progressbar'
import { ImageModule } from 'primeng/image'
import { TagModule } from 'primeng/tag'
import { InputNumberModule } from 'primeng/inputnumber'
import { ButtonModule } from 'primeng/button'
import { PanelModule } from 'primeng/panel'

import { Store } from '@ngrx/store'
import { IBasketItem, IProduct } from '@/types'
import { actions, IAppState, selectors } from '@/store'

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    ProgressBarModule,
    LetModule,
    PushModule,
    ImageModule,
    TagModule,
    InputNumberModule,
    FormsModule,
    ButtonModule,
    PanelModule,
  ],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<IProduct | null>
  quantityLabel$!: Observable<string>
  isLoading$!: Observable<boolean>
  quantity = 1

  private readonly route = inject(ActivatedRoute)
  private readonly store$ = inject(Store<IAppState>)
  private readonly breadcrumbService = inject(BreadcrumbService)

  ngOnInit(): void {
    const productId = +this.route.snapshot.params['id']
    this.product$ = this.route.data.pipe(
      map((data: any) => data.product),
      tap((product) =>
        this.breadcrumbService.set('@productName', product!.name)
      )
    )

    this.isLoading$ = this.store$.select(selectors.selectIsBasketLoading)
    this.quantityLabel$ = this.store$.select(
      selectors.selectBasketItemQuantity(productId, '0')
    )
  }

  getDescParagraphs(description: string) {
    return description.split(/\.|•|!/i)
  }

  handleAddToBasket(product: IProduct) {
    const item: IBasketItem = { ...product, quantity: this.quantity }
    this.store$.dispatch(actions.saveItemToBasket({ item, setQuantity: false }))
  }
}
