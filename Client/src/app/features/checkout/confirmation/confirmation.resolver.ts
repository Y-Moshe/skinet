import { inject } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { Store } from '@ngrx/store'

import { IAppState, selectors } from '@/store'
import { IBasketState } from '@/store/reducers/basket'

export const ConfirmationResolver: ResolveFn<IBasketState> = () => {
  const store$ = inject(Store<IAppState>)
  return store$.select(selectors.selectBasketState)
}
