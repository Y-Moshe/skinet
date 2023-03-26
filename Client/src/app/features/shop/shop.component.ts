import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { IAppState, actions, selectors } from '@/store'
import {
  IProduct,
  IProductBrand,
  IProductType,
  IShopFilterByParams,
} from '@/types'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit, OnDestroy {
  products$!: Observable<IProduct[]>
  categories$!: Observable<IProductType[]>
  brands$!: Observable<IProductBrand[]>
  isLoading$!: Observable<boolean>
  filterBy$!: Observable<IShopFilterByParams>

  querySubscription!: Subscription

  constructor(
    private store$: Store<IAppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(actions.loadShop())

    this.products$ = this.store$.select(selectors.selectProducts)
    this.isLoading$ = this.store$.select(selectors.selectIsLoading)
    this.filterBy$ = this.store$.select(selectors.selectFilterBy)

    this.categories$ = this.store$.select(selectors.selectCategories)
    this.brands$ = this.store$.select(selectors.selectProductBrands)

    this.querySubscription = this.route.queryParams.subscribe((params) => {
      this.store$.dispatch(
        actions.setFilterBy({
          filterBy: { ...(params as any) },
        })
      )
    })
  }

  handleCategoryChange({ id: categoryId }: IProductType) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { categoryId },
      queryParamsHandling: 'merge',
    })
  }

  handleBrandChange({ id: brandId }: IProductBrand) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { brandId },
      queryParamsHandling: 'merge',
    })
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe()
  }
}
