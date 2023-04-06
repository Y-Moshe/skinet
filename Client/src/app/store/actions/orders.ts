import { createActionGroup, props, emptyProps } from '@ngrx/store'
import { IErrorResponse, IOrder, IDeliveryMethod } from '@/types'

export default createActionGroup({
  source: 'Orders API',
  events: {
    'Place Order': emptyProps(),
    'Place Order Success': props<{ order: IOrder }>(),
    'Place Order Failed': props<IErrorResponse>(),
    'Load User Orders': emptyProps(),
    'Load User Orders Success': props<{ orders: IOrder[] }>(),
    'Load User Orders Failed': props<IErrorResponse>(),
    'Load Delivery Methods': emptyProps(),
    'Load Delivery Methods Success': props<{ methods: IDeliveryMethod[] }>(),
    'Load Delivery Methods Falied': props<IErrorResponse>(),
  },
})
