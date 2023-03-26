import { createActionGroup, props, emptyProps } from '@ngrx/store'
import {
  IErrorResponse,
  ILoginErrorResponse,
  ILoginResponse,
  IUser,
} from '@/types'

type Credintials = {
  email: string
  password: string
}

export default createActionGroup({
  source: 'Auth API',
  events: {
    'Set Logged In User': props<IUser | null>(),
    Register: props<IUser>(),
    'Register Success Response': props<ILoginResponse>(),
    'Register Error Response': props<IErrorResponse>(),
    Login: props<Credintials>(),
    'Login Success Response': props<ILoginResponse>(),
    'Login Error Response': props<ILoginErrorResponse>(),
    Logout: emptyProps(),
    'Logout Success Response': emptyProps(),
    'Logout Error Response': props<IErrorResponse>(),
    'Load User': emptyProps(),
  },
})
