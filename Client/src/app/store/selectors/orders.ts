import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IOrdersState } from '../reducers/orders'

const selectOrdersState = createFeatureSelector<IOrdersState>('ordersState')

const selectUserOrders = createSelector(
  selectOrdersState,
  (state) => state.userOrders
)

const selectIsUserOrdersLoading = createSelector(
  selectOrdersState,
  (state) => state.isUserOrdersLoading
)

const selectDeliveryMethods = createSelector(
  selectOrdersState,
  (state) => state.deliveryMethods
)

const selectIsMethodsLoading = createSelector(
  selectOrdersState,
  (state) => state.isMethodsLoading
)

const selectIsPlacingOrder = createSelector(
  selectOrdersState,
  (state) => state.isPlacingOrder
)

export default {
  selectUserOrders,
  selectIsUserOrdersLoading,
  selectDeliveryMethods,
  selectIsMethodsLoading,
  selectIsPlacingOrder,
}
