import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LetModule, PushModule } from '@ngrx/component'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'

import { IAppState, actions, selectors } from '@/store'
import {
  IProduct,
  IBrand,
  ICategory,
  IShopFilterByParams,
  IBasketItem,
} from '@/types'

import { BlockableDiv } from '@/components'
import { ProductSortComponent } from './product-sort/product-sort.component'
import { ProductSearchComponent } from './product-search/product-search.component'
import { ProductFiltersComponent } from './product-filters/product-filters.component'
import { ProductListComponent } from './product-list/product-list.component'
import { BlockUIModule } from 'primeng/blockui'
import { PaginatorModule } from 'primeng/paginator'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    LetModule,
    PushModule,
    ProductSortComponent,
    ProductSearchComponent,
    ProductFiltersComponent,
    ProductListComponent,
    BlockableDiv,
    BlockUIModule,
    ProgressSpinnerModule,
    PaginatorModule,
  ],
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit, OnDestroy {
  products$!: Observable<IProduct[]>
  categories$!: Observable<ICategory[]>
  brands$!: Observable<IBrand[]>
  isLoading$!: Observable<boolean>
  isBasketLoading$!: Observable<boolean>
  totalProducts$!: Observable<number>
  filterBy$!: Observable<IShopFilterByParams>

  querySub!: Subscription

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
    this.isBasketLoading$ = this.store$.select(selectors.selectIsBasketLoading)
    this.totalProducts$ = this.store$.select(selectors.selectTotalProducts)
    this.filterBy$ = this.store$.select(selectors.selectFilterBy)

    this.querySub = this.route.queryParams.subscribe((params) => {
      // convert from query params to filterBy correct types
      const filterBy = this.validateFilterByTypes({ ...params })
      this.store$.dispatch(actions.mergeFilterBy({ filterBy }))
    })
  }

  // inforce correct filterBy types
  public validateFilterByTypes(params: any): IShopFilterByParams {
    const numberKeys: any = {
      categoryId: true,
      pageIndex: true,
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

  handlePageChange(event: any) {
    this.applyFilters({
      pageIndex: event.page + 1,
      pageSize: event.rows,
    })
  }

  applyFilters(filters: IShopFilterByParams) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...filters },
      queryParamsHandling: 'merge',
    })
  }

  handleAddToBasket(product: IProduct) {
    const item: IBasketItem = { ...product, quantity: 1 }
    this.store$.dispatch(actions.saveItemToBasket({ item, setQuantity: false }))
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe()
  }
}
