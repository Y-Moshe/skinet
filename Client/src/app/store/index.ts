import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule, ActionReducerMap } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../../environments/environment'

import { AuthEffects } from './effects/auth'
import authReducer, { IAuthState } from './reducers/auth'
import authActions from './actions/auth'
import authSelectors from './selectors/auth'

import shopActions from './actions/shop'
import { ShopEffects } from './effects/shop'
import shopReducer, { IShopState } from './reducers/shop'
import shopSelectors from './selectors/shop'

import basketActions from './actions/basket'
import { BasketEffects } from './effects/basket'
import basketReducer, { IBasketState } from './reducers/basket'
import basketSelectors from './selectors/basket'

export interface IAppState {
  authState: IAuthState
  shopState: IShopState
  basketState: IBasketState
}

const reducers: ActionReducerMap<IAppState> = {
  authState: authReducer,
  shopState: shopReducer,
  basketState: basketReducer,
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, ShopEffects, BasketEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  exports: [StoreModule, EffectsModule],
})
export class AppStoreModule {}

export const actions = {
  ...authActions,
  ...shopActions,
  ...basketActions,
}

export const selectors = {
  ...authSelectors,
  ...shopSelectors,
  ...basketSelectors,
}
