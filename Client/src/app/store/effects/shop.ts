import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { map, mergeMap, catchError } from 'rxjs/operators'

import ACTIONS from '../actions/shop'
import { ShopService } from '@/services'

@Injectable()
export class ShopEffects {
  setFilterBy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.setFilterBy),
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

  getProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.getProduct),
      mergeMap(({ id }) =>
        this.shopService.getProduct(id).pipe(
          map((response) => ACTIONS.getProductSuccessResponse(response)),
          catchError((err) => of(ACTIONS.getProductErrorResponse(err)))
        )
      )
    )
  )

  constructor(private actions$: Actions, private shopService: ShopService) {}
}
