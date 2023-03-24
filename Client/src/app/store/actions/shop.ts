import { createActionGroup, props, emptyProps } from '@ngrx/store'
import { IErrorResponse, IPaginateResponse, IProduct, IShopFilterByParams } from '@/types'

export default createActionGroup({
  source: 'Products API',
  events: {
    'Set Filter By': props<{ filterBy: IShopFilterByParams }>(),
    'Load Products': emptyProps(),
    'Load Products Success Response': props<IPaginateResponse<IProduct>>(),
    'Load Products Error Response': props<IErrorResponse>(),
    'Get Product': props<{ id: number }>(),
    'Get Product Success Response': props<IProduct>(),
    'Get Product Error Response': props<IErrorResponse>(),
  },
})
