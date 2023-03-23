import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY, of } from 'rxjs'
import { map, mergeMap, catchError, tap } from 'rxjs/operators'

import ACTIONS from '../actions/auth'
import { AuthService } from '@/services'

@Injectable()
export class AuthEffects {
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.register),
      mergeMap((user) =>
        this.authService.register(user).pipe(
          tap(({ token }) => this.authService.saveAuthToken(token)),
          map((response) => ACTIONS.registerSuccessResponse(response)),
          catchError((err) => of(ACTIONS.registerErrorResponse(err)))
        )
      )
    )
  )

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          tap(({ token }) => this.authService.saveAuthToken(token)),
          map((response) => ACTIONS.loginSuccessResponse(response)),
          catchError((err) => of(ACTIONS.loginErrorResponse(err)))
        )
      )
    )
  )

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.logout),
      mergeMap(() =>
        this.authService.logout().pipe(
          tap(() => this.authService.clearAuthToken()),
          map(() => ACTIONS.logoutSuccessResponse()),
          catchError((err) => of(ACTIONS.logoutErrorResponse(err)))
        )
      )
    )
  )

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.loadUser),
      mergeMap(() => {
        const token = this.authService.loadAuthToken()
        if (!token) return EMPTY

        // Get most updated user as well if it hasn't been expired yet
        return this.authService.getLoggedInUser().pipe(
          map(user => ACTIONS.setLoggedInUser(user)),
          catchError(() => {
            this.authService.clearAuthToken()
            return EMPTY
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private authService: AuthService) {}
}
