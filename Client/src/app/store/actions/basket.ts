import { createActionGroup, props, emptyProps } from '@ngrx/store'
import { IBasket, IBasketItem, IErrorResponse } from '@/types'

export default createActionGroup({
  source: 'Basket API',
  events: {
    'Load Basket': emptyProps(),
    'Save Item To Basket': props<{ item: IBasketItem, setQuantity: boolean }>(),
    'Remove Item From Basket': props<{ itemId: number }>(),
    'Update Basket': props<{ basket: IBasket }>(),
    'Update Basket Success': props<{ basket: IBasket }>(),
    'Update Basket Error': props<IErrorResponse>(),
    'Delete Basket': props<{ id: string }>(),
    'Delete Basket Success': emptyProps(),
    'Delete Basket Error': props<IErrorResponse>(),
  },
})
