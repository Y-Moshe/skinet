import { BaseEntity } from './base-entity'
import { IProduct } from './product'

type OrderedProduct = Omit<IProduct, 'id' | 'brand' | 'category'> & {
  productId: number
}

export interface IOrderItem extends BaseEntity<number>, OrderedProduct {
  quantity: number
}
