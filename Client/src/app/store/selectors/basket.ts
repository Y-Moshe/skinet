import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IBasketState } from '../reducers/basket'

const selectBasketState = createFeatureSelector<IBasketState>('basketState')

const selectBasket = createSelector(selectBasketState, (state) => state.basket)

const selectBasketCount = createSelector(
  selectBasketState,
  (state) => state.basket.items.length
)

export default {
  selectBasketState,
  selectBasket,
  selectBasketCount,
}
