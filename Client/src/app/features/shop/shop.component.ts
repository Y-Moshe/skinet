import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { IAppState, actions, selectors } from '@/store'
import { IProduct, IShopFilterByParams } from '@/types'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  products$!: Observable<IProduct[]>
  isLoading$!: Observable<boolean>
  filterBy$!: Observable<IShopFilterByParams>

  constructor(private store$: Store<IAppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(actions.loadProducts())

    this.products$ = this.store$.select(selectors.selectProducts)
    this.isLoading$ = this.store$.select(selectors.selectIsLoading)
    this.filterBy$ = this.store$.select(selectors.selectFilterBy)
  }
}
