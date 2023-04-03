import { BaseEntity } from './base-entity'

export interface IDeliveryMethod extends BaseEntity<number> {
  shortName: string
  deliveryTime: string
  description: string
  price: number
}
