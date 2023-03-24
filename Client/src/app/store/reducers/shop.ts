import { createReducer, on } from '@ngrx/store'
import { IProduct, IShopFilterByParams } from '@/types'
import ACTIONS from '../actions/shop'

export interface IShopState {
  totalProducts: number
  products: IProduct[]
  isLoading: boolean
  filterBy: IShopFilterByParams
}

const initialState: IShopState = {
  products: [],
  totalProducts: 0,
  isLoading: false,
  filterBy: {
    brandId: 0,
    typeId: 0,
    sort: 'name',
    pageNumber: 1,
    pageSize: 6,
    search: '',
  },
}

export default createReducer<IShopState>(
  initialState,
  on(ACTIONS.setFilterBy, (state, { filterBy }) => ({
    ...state,
    filterBy,
    isLoading: true,
  })),

  on(ACTIONS.loadProducts, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(ACTIONS.loadProductsSuccessResponse, (state, results) => ({
    ...state,
    products: results.data,
    totalProducts: results.count,
  })),

  on(
    ACTIONS.loadProductsSuccessResponse,
    ACTIONS.loadProductsErrorResponse,
    (state) => ({
      ...state,
      isLoading: false,
    })
  )
)
