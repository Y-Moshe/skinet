import { BaseEntity } from './base-entity'
import { IProduct } from './product'

export interface IBasket extends BaseEntity<string> {
  items: IBasketItem[]
}

export interface IBasketItem extends IProduct {
  quantity: number
}
