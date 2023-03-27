import { createReducer, on } from '@ngrx/store'
import { IProduct, IBrand, ICategory, IShopFilterByParams } from '@/types'
import ACTIONS from '../actions/shop'

export interface IShopState {
  totalProducts: number
  products: IProduct[]
  categories: ICategory[]
  brands: IBrand[]
  isLoading: boolean
  filterBy: IShopFilterByParams
}

const initialState: IShopState = {
  products: [],
  categories: [],
  brands: [],
  totalProducts: 0,
  isLoading: false,
  filterBy: {
    brandIds: [],
    categoryId: 0,
    sort: '',
    pageIndex: 1,
    pageSize: 6,
    search: '',
  },
}

export default createReducer<IShopState>(
  initialState,
  on(ACTIONS.loadShopSuccessResponse, (state, results) => ({
    ...state,
    brands: results.brands,
    categories: results.categories,
  })),

  on(ACTIONS.setFilterBy, (state, { filterBy }) => ({
    ...state,
    filterBy,
    isLoading: true,
  })),

  on(ACTIONS.mergeFilterBy, (state, { filterBy }) => ({
    ...state,
    filterBy: {
      ...state.filterBy,
      ...filterBy,
    },
    isLoading: true,
  })),

  on(ACTIONS.loadProducts, ACTIONS.loadShop, (state) => ({
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
    ACTIONS.loadShopSuccessResponse,
    ACTIONS.loadShopErrorResponse,
    (state) => ({
      ...state,
      isLoading: false,
    })
  )
)
