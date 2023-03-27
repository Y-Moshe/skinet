import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
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
    this.categories$ = this.store$.select(selectors.selectCategories)
    this.brands$ = this.store$.select(selectors.selectBrands)
    this.isLoading$ = this.store$.select(selectors.selectIsShopLoading)
    this.filterBy$ = this.store$.select(selectors.selectFilterBy)

    this.querySubscription = this.route.queryParams.subscribe((params) => {
      // convert from query params to filterBy correct types
      const filterBy = this.validateFilterByTypes({ ...params })
      this.store$.dispatch(actions.mergeFilterBy({ filterBy }))
    })
  }

  // inforce correct filterBy types
  public validateFilterByTypes(params: any): IShopFilterByParams {
    const numberKeys: any = {
      categoryId: true,
      pageNumber: true,
      pageSize: true,
    }

    Object.keys(params).forEach((key) => {
      if (numberKeys[key] && typeof params[key] === 'string')
        params[key] = +params[key]

      if (key === 'brandIds') {
        params.brandIds = params.brandIds.split(',').map((_: any) => +_)
      }
    })

    return params as IShopFilterByParams
  }

  handleSearchChange(searchQuery: string) {
    this.applyFilters({ search: searchQuery })
  }

  handleSortChange(sort: string) {
    this.applyFilters({ sort })
  }

  handleCategoryChange(categoryId: number) {
    this.applyFilters({ categoryId })
  }

  handleBrandsChange(brandIds: number[]) {
    const queryableString = brandIds.join(',')
    this.applyFilters({ brandIds: queryableString })
  }

  applyFilters(filters: IShopFilterByParams) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...filters },
      queryParamsHandling: 'merge',
    })
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe()
  }
}
