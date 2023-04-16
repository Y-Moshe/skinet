import * as cuid from 'cuid'
import { BaseEntity } from './base-entity'
import { IProduct } from './product'

export interface IBasket extends BaseEntity<string> {
  items: IBasketItem[]
  deliveryMethodId?: number
  clientSecret?: string
  paymentIntentId?: string
}

export interface IBasketItem extends IProduct {
  quantity: number
}

export interface IBasketTotals {
  shipping: number
  subtotal: number
  total: number
}

export class Basket implements IBasket {
  id?: string | undefined
  items: IBasketItem[] = []

  constructor(id = cuid(), items: IBasketItem[] = []) {
    this.id = cuid()
    this.items = items
  }
}
