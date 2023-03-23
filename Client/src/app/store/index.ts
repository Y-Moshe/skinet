import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule, ActionReducerMap } from '@ngrx/store'
import { LetModule, PushModule } from '@ngrx/component'

import { AuthEffects } from './effects/auth'
import authReducer, { IAuthState } from './reducers/auth'
import authActions from './actions/auth'
import authSelectors from './selectors/auth'

export interface IAppState {
  authState: IAuthState
}

const reducers: ActionReducerMap<IAppState> = {
  authState: authReducer,
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    LetModule,
    PushModule,
  ],
  exports: [StoreModule, EffectsModule, LetModule, PushModule],
})
export class AppStoreModule {}

export const actions = {
  ...authActions,
}

export const selectors = {
  ...authSelectors,
}
