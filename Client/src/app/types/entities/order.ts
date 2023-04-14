import { IAddress } from './address'
import { BaseEntity } from './base-entity'
import { IDeliveryMethod } from './delivery-method'
import { IOrderItem } from './order-item'

type OrderedAddress = Omit<IAddress, 'id' | 'createdAt'>

export enum OrderStatus {
  Pending = 'Pending',
  PaymentReceived = 'Payment Received',
  PaymentFailed = 'Payment Failed',
}

export interface IOrder extends BaseEntity<number> {
  buyerEmail: string
  address: OrderedAddress
  deliveryMethod: IDeliveryMethod
  items: IOrderItem[]
  status: OrderStatus
  paymentId: string
  subtotal: number
  total: number
}

export interface ICreateOrder {
  buyerEmail: string
  address: OrderedAddress
  deliveryMethodId: number
  basketId: string
}
