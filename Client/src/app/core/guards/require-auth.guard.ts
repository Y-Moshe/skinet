import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { select, Store } from '@ngrx/store'
import { IAppState, selectors } from '@/store'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RequireAuthGuard implements CanActivate {
  constructor(private store: Store<IAppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(
      select(selectors.selectLoggedInUser),
      map((user) => user !== null)
    )
  }
}
