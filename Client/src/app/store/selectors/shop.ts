import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IShopState } from '../reducers/shop'

const selectShopState = createFeatureSelector<IShopState>('shopState')

const selectFilterBy = createSelector(
  selectShopState,
  (state) => state.filterBy
)

const selectIsLoading = createSelector(
  selectShopState,
  (state) => state.isLoading
)

export default {
  selectFilterBy,
  selectIsLoading,
}
