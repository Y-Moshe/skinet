import { IUser } from './entities/user'

export interface ILoginResponse {
  token: string
  user: IUser
}
