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

const selectBrands = createSelector(selectShopState, (state) => state.brands)

const selectIsShopLoading = createSelector(
  selectShopState,
  (state) => state.isLoading
)

const selectTotalProducts = createSelector(
  selectShopState,
  (state) => state.totalProducts
)

export default {
  selectFilterBy,
  selectProducts,
  selectIsShopLoading,
  selectCategories,
  selectBrands,
  selectTotalProducts,
}
