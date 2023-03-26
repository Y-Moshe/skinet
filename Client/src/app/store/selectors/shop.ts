import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IShopState } from '../reducers/shop'

const selectShopState = createFeatureSelector<IShopState>('shopState')

const selectFilterBy = createSelector(
  selectShopState,
  (state) => state.filterBy
)

const selectProducts = createSelector(
  selectShopState,
  (state) => state.products
)
const selectCategories = createSelector(
  selectShopState,
  (state) => state.categories
)

const selectBrands = createSelector(
  selectShopState,
  (state) => state.brands
)

const selectIsLoading = createSelector(
  selectShopState,
  (state) => state.isLoading
)

export default {
  selectFilterBy,
  selectProducts,
  selectIsLoading,
  selectCategories,
  selectBrands,
}
