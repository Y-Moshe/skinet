import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { IAppState, selectors } from '@/store'
import { map } from 'rxjs'

export const RequireAuthGuard: CanActivateFn = () => {
  const router = inject(Router)
  const store$ = inject(Store<IAppState>)

  return store$.pipe(
    select(selectors.selectLoggedInUser),
    map((user) => {
      const isAuth = user !== null
      !isAuth && router.navigate(['/auth/login'], { replaceUrl: true })
      return isAuth
    })
  )
}
