import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { IAppState, actions, selectors } from '@/store'
import { IProduct, IBrand, ICategory, IShopFilterByParams } from '@/types'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit, OnDestroy {
  products$!: Observable<IProduct[]>
  categories$!: Observable<ICategory[]>
  brands$!: Observable<IBrand[]>
  isLoading$!: Observable<boolean>

  querySubscription!: Subscription

  constructor(
    private store$: Store<IAppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(actions.loadShop())

    this.products$ = this.store$.select(selectors.selectProducts)
    this.isLoading$ = this.store$.select(selectors.selectIsShopLoading)

    this.categories$ = this.store$.select(selectors.selectCategories)
    this.brands$ = this.store$.select(selectors.selectBrands)

    this.querySubscription = this.route.queryParams.subscribe((params) => {
      const filterBy: IShopFilterByParams = { ...params }
      this.store$.dispatch(actions.setFilterBy({ filterBy }))
    })
  }

  handleSearchChange(searchQuery: string) {
    const filterBy: IShopFilterByParams = { search: searchQuery }
    this.store$.dispatch(actions.setFilterBy({ filterBy }))
  }

  handleCategoryChange({ id: categoryId }: ICategory) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { categoryId },
      queryParamsHandling: 'merge',
    })
  }

  handleBrandChange({ id: brandId }: IBrand) {
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
