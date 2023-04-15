import { inject } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { Store } from '@ngrx/store'

import { IAppState, selectors } from '@/store'
import { map } from 'rxjs'

export const FullNameTitleResolver: ResolveFn<string> = () => {
  const store$ = inject(Store<IAppState>)
  return store$
    .select(selectors.selectLoggedInUser)
    .pipe(map((user) => user!.fullName))
}
