import { BaseEntity } from './base-entity'
import { IAddress } from './address'

export interface IUser extends BaseEntity<string> {
  email: string
  fullName: string
  address?: IAddress
}
