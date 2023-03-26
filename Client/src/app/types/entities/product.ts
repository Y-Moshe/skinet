import { BaseEntity } from './base-entity'
import { IBrand } from './brand'
import { ICategory } from './category'

export interface IProduct extends BaseEntity {
  name: string
  description: string
  price: number
  pictureUrl: string
  brand: IBrand
  category: ICategory
}
