import { IAddress } from './address'
import { IDeliveryMethod } from './delivery-method'
import { IOrderItem } from './order-item'

type OrderedAddress = Omit<IAddress, 'id' | 'createdAt'>

export enum OrderStatus {
  Pending = 'Pending',
  PaymentReceived = 'Payment Received',
  PaymentFailed = 'Payment Failed',
}

export interface IOrder {
  id: number
  buyerEmail: string
  address: OrderedAddress
  deliveryMethod: IDeliveryMethod
  items: IOrderItem[]
  status: OrderStatus
  paymentId: string
  subtotal: number
}

export interface ICreateOrder {
  buyerEmail: string
  address: OrderedAddress
  deliveryMethodId: number
  basketId: string
}
