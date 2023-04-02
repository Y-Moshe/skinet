import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IBasketState } from '../reducers/basket'

const selectBasketState = createFeatureSelector<IBasketState>('basketState')

const selectBasket = createSelector(selectBasketState, (state) => state.basket)

const selectBasketCount = createSelector(
  selectBasketState,
  (state) => state.basket.items.length
)

const selectBasketItemsCount = createSelector(selectBasketState, (state) =>
  state.basket.items.reduce((acc, item) => acc + item.quantity, 0)
)

const selectBasketSubtotal = createSelector(
  selectBasketState,
  (state) => state.subtotal
)

const selectIsBasketLoading = createSelector(
  selectBasketState,
  (state) => state.isBasketLoading
)

const selectBasketItemQuantity = (itemId: number) =>
  createSelector(
    selectBasket,
    (basket) =>
      basket.items.find((item) => item.id === itemId)?.quantity.toString() ||
      '+'
  )

export default {
  selectBasketState,
  selectBasket,
  selectBasketCount,
  selectBasketItemsCount,
  selectBasketSubtotal,
  selectBasketItemQuantity,
  selectIsBasketLoading,
}
