import { BaseEntity } from './base-entity'

export interface IAddress extends BaseEntity {
  firstName: string
  lastName: string
  street: string
  city: string
  state: string
  zipCode: string
}
