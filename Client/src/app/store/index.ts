import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule, ActionReducerMap } from '@ngrx/store'
import { LetModule, PushModule } from '@ngrx/component'

import { AuthEffects } from './effects/auth'
import authReducer, { IAuthState } from './reducers/auth'
import authActions from './actions/auth'
import shopActions from './actions/shop'
import { ShopEffects } from './effects/shop'
import shopReducer, { IShopState } from './reducers/shop'
import authSelectors from './selectors/auth'
import shopSelectors from './selectors/shop'

export interface IAppState {
  authState: IAuthState
  shopState: IShopState
}

const reducers: ActionReducerMap<IAppState> = {
  authState: authReducer,
  shopState: shopReducer,
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, ShopEffects]),
    LetModule,
    PushModule,
  ],
  exports: [StoreModule, EffectsModule, LetModule, PushModule],
})
export class AppStoreModule {}

export const actions = {
  ...authActions,
  ...shopActions,
}

export const selectors = {
  ...authSelectors,
  ...shopSelectors,
}
