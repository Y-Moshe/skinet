import { createReducer, on } from '@ngrx/store'
import { IUser } from '@/types'
import ACTIONS from '../actions/auth'

export interface IAuthState {
  loggedInUser: IUser | null
  isSubmitting: boolean
  isLoggingOut: boolean
}

const initialState: IAuthState = {
  loggedInUser: null,
  isSubmitting: false,
  isLoggingOut: false,
}

export default createReducer<IAuthState>(
  initialState,
  on(ACTIONS.setLoggedInUser, (state, user) => ({
    ...state,
    loggedInUser: user,
  })),

  // Login & Register
  on(ACTIONS.login, ACTIONS.register, (state) => ({
    ...state,
    isSubmitting: true,
  })),

  on(
    ACTIONS.loginSuccessResponse,
    ACTIONS.registerSuccessResponse,
    (state, { user }) => ({
      ...state,
      loggedInUser: user,
      isSubmitting: false,
    })
  ),

  // Logout
  on(ACTIONS.logout, (state) => ({
    ...state,
    isLoggingOut: true,
  })),

  on(ACTIONS.logoutSuccessResponse, (state) => ({
    ...state,
    loggedInUser: null,
    isLoggingOut: false,
  })),

  // User address
  on(
    ACTIONS.setUserAddress,
    ACTIONS.saveUserAddressSuccessResponse,
    (state, { address }) => ({
      ...state,
      loggedInUser: {
        ...state.loggedInUser!,
        address,
      },
    })
  ),

  // Error handling
  on(
    ACTIONS.loginErrorResponse,
    ACTIONS.registerErrorResponse,
    ACTIONS.logoutErrorResponse,
    (state) => ({
      ...state,
      isSubmitting: false,
      isLoggingOut: false,
    })
  )
)
