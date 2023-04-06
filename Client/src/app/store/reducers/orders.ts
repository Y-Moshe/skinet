import { createReducer, on } from '@ngrx/store'
import { IOrder, IDeliveryMethod } from '@/types'
import ACTIONS from '../actions/orders'

export interface IOrdersState {
  userOrders: IOrder[]
  deliveryMethods: IDeliveryMethod[]
  isPlacingOrder: boolean
  isUserOrdersLoading: boolean
  isMethodsLoading: boolean
}

const initialState: IOrdersState = {
  userOrders: [],
  deliveryMethods: [],
  isPlacingOrder: false,
  isUserOrdersLoading: false,
  isMethodsLoading: false,
}

export default createReducer<IOrdersState>(
  initialState,
  // Place order
  on(ACTIONS.placeOrder, (state) => ({
    ...state,
    isPlacingOrder: true,
  })),

  on(ACTIONS.placeOrderSuccess, (state, { order }) => ({
    ...state,
    userOrders: [order, ...state.userOrders],
  })),

  on(ACTIONS.placeOrderSuccess, ACTIONS.placeOrderFailed, (state) => ({
    ...state,
    isPlacingOrder: false,
  })),

  // Load orders
  on(ACTIONS.loadUserOrders, (state) => ({
    ...state,
    isUserOrdersLoading: true,
  })),

  on(ACTIONS.loadUserOrdersSuccess, (state, { orders }) => ({
    ...state,
    userOrders: orders,
  })),

  on(ACTIONS.loadUserOrdersSuccess, ACTIONS.loadUserOrdersFailed, (state) => ({
    ...state,
    isUserOrdersLoading: false,
  })),

  // Load delivery methods
  on(ACTIONS.loadDeliveryMethods, (state) => ({
    ...state,
    isMethodsLoading: true,
  })),

  on(ACTIONS.loadDeliveryMethodsSuccess, (state, { methods }) => ({
    ...state,
    deliveryMethods: methods,
  })),

  on(
    ACTIONS.loadDeliveryMethodsSuccess,
    ACTIONS.loadDeliveryMethodsFalied,
    (state) => ({
      ...state,
      isMethodsLoading: false,
    })
  )
)
