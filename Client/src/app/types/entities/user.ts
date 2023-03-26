import { BaseEntity } from './base-entity'

export interface IUser extends BaseEntity<string> {
  email: string
  fullName: string
}
