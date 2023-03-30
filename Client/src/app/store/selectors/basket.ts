import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IBasketState } from '../reducers/basket'

const selectBasketState = createFeatureSelector<IBasketState>('basketState')

const selectBasket = createSelector(selectBasketState, (state) => state.basket)

export default {
  selectBasketState,
  selectBasket,
}
