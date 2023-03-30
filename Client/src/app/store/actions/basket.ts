import { createActionGroup, props, emptyProps } from '@ngrx/store'
import { IBasket, IErrorResponse } from '@/types'

export default createActionGroup({
  source: 'Basket API',
  events: {
    'Load Basket': emptyProps(),
    'Update Basket': props<{ basket: IBasket }>(),
    'Update Basket Success': props<{ basket: IBasket }>(),
    'Update Basket Error': props<IErrorResponse>(),
    'Delete Basket': props<{ id: string }>(),
    'Delete Basket Success': emptyProps(),
    'Delete Basket Error': props<IErrorResponse>(),
  },
})
