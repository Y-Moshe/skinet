import { BaseEntity } from './base-entity'
import { IProductBrand } from './product-brand'
import { IProductType } from './product-type'

export interface IProduct extends BaseEntity {
  name: string
  description: string
  price: number
  pictureUrl: string
  productType: IProductBrand
  productBrand: IProductType
}
