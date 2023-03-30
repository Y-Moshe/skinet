import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { forkJoin, of } from 'rxjs'
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators'

import ACTIONS from '../actions/shop'
import { ShopService } from '@/services'

@Injectable()
export class ShopEffects {
  loadShop$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.loadShop),
      mergeMap(() =>
        forkJoin({
          pagination: this.shopService.getProducts(),
          categories: this.shopService.getCategories(),
          brands: this.shopService.getBrands(),
        }).pipe(
          switchMap((results) => [
            ACTIONS.loadProductsSuccessResponse(results.pagination),
            ACTIONS.loadShopSuccessResponse(results),
          ]),
          catchError((err) => of(ACTIONS.loadShopErrorResponse(err)))
        )
      )
    )
  )

  setFilterBy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.setFilterBy, ACTIONS.mergeFilterBy),
      mergeMap(({ filterBy }) =>
        this.shopService.getProducts(filterBy).pipe(
          map((response) => ACTIONS.loadProductsSuccessResponse(response)),
          catchError((err) => of(ACTIONS.loadProductsErrorResponse(err)))
        )
      )
    )
  )

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.loadProducts),
      mergeMap(() =>
        this.shopService.getProducts().pipe(
          map((response) => ACTIONS.loadProductsSuccessResponse(response)),
          catchError((err) => of(ACTIONS.loadProductsErrorResponse(err)))
        )
      )
    )
  )

  constructor(private actions$: Actions, private shopService: ShopService) {}
}
