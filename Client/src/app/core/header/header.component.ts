import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { MenuItem } from 'primeng/api/menuitem'
import { Observable, Subscription } from 'rxjs'

import { IAppState, actions, selectors } from '@/store'
import { IUser } from '@/types'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  userLinks: MenuItem[] = [
    {
      label: 'Orders',
      icon: 'pi pi-book',
      routerLink: '/orders',
    },
    { separator: true },
    {
      label: 'Logout',
      icon: 'pi pi-power-off',
      command: () => this.handleLogout(),
    },
  ]
  user$!: Observable<IUser | null>
  isLoggingOut$!: Observable<boolean>
  logoutSub!: Subscription

  constructor(
    private store: Store<IAppState>,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggingOut$ = this.store.pipe(select(selectors.selectIsLoggingOut))
    this.user$ = this.store.select(selectors.selectLoggedInUser)

    this.logoutSub = this.actions$
      .pipe(ofType(actions.logoutSuccessResponse))
      .subscribe(() => this.router.navigate(['/']))
  }

  handleLogout() {
    this.store.dispatch(actions.logout())
  }

  ngOnDestroy(): void {
    this.logoutSub.unsubscribe()
  }
}
