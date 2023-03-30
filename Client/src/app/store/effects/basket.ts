import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY, of } from 'rxjs'
import {
  map,
  mergeMap,
  catchError,
  switchMap,
  tap,
  withLatestFrom,
  debounceTime,
} from 'rxjs/operators'

import ACTIONS from '../actions/basket'
import { BasketService } from '@/services'
import { IAppState, selectors } from '@/store'
import { Store } from '@ngrx/store'

@Injectable()
export class BasketEffects {
  loadBasket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.loadBasket),
      map(() => this.basketService.loadBasketId()!),
      mergeMap((id) =>
        this.basketService.getBasket(id).pipe(
          map((basket) => ACTIONS.updateBasketSuccess({ basket })),
          tap(
            ({ basket }) => !id && this.basketService.saveBasketId(basket.id!)
          ),
          catchError(() => EMPTY)
        )
      )
    )
  )

  saveItemToBasket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.saveItemToBasket),
      debounceTime(1000),
      withLatestFrom(this.store$.select(selectors.selectBasket)),
      mergeMap(([{ item }, basket]) =>
        this.basketService.updateBasket(basket).pipe(
          map(() => ACTIONS.updateBasketSuccess({ basket })),
          catchError((err) => of(ACTIONS.updateBasketError(err)))
        )
      )
    )
  )

  updateBasket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.updateBasket),
      mergeMap(({ basket }) =>
        this.basketService.updateBasket(basket).pipe(
          map((basket) => ACTIONS.updateBasketSuccess({ basket })),
          catchError((err) => of(ACTIONS.updateBasketError(err)))
        )
      )
    )
  )

  deleteBasket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.deleteBasket),
      mergeMap(({ id }) =>
        this.basketService.deleteBasket(id).pipe(
          switchMap(() => [
            ACTIONS.deleteBasketSuccess(),
            ACTIONS.loadBasket(),
          ]),
          tap(() => this.basketService.clearBasketId()),
          catchError((err) => of(ACTIONS.deleteBasketError(err)))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private store$: Store<IAppState>,
    private basketService: BasketService
  ) {}
}
