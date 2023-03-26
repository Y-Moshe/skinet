import { createActionGroup, props, emptyProps } from '@ngrx/store'
import {
  IErrorResponse,
  IPaginateResponse,
  IProduct,
  IProductBrand,
  IProductType,
  IShopFilterByParams,
} from '@/types'

type IShopSuccessResponse = {
  pagination: IPaginateResponse<IProduct>
  categories: IProductType[]
  brands: IProductBrand[]
}

export default createActionGroup({
  source: 'Products API',
  events: {
    'Set Filter By': props<{ filterBy: IShopFilterByParams }>(),
    'Load Shop': emptyProps(),
    'Load Shop Success Response': props<IShopSuccessResponse>(),
    'Load Shop Error Response': props<IErrorResponse>(),
    'Load Products': emptyProps(),
    'Load Products Success Response': props<IPaginateResponse<IProduct>>(),
    'Load Products Error Response': props<IErrorResponse>(),
    'Get Product': props<{ id: number }>(),
    'Get Product Success Response': props<IProduct>(),
    'Get Product Error Response': props<IErrorResponse>(),
  },
})
