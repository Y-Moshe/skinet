import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core'
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
  user: IUser | null = null
  basketCount: number = 0
  showMobileMenu: boolean = false

  isLoggingOut$!: Observable<boolean>
  userSub!: Subscription
  basketCountSub!: Subscription
  logoutSub!: Subscription

  userLinks: MenuItem[] = [
    {
      label: 'Account',
      icon: 'pi pi-user',
      routerLink: '/account',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Orders',
      icon: 'pi pi-book',
      routerLink: '/account/orders',
    },
    { separator: true },
    {
      label: 'Logout',
      icon: 'pi pi-power-off',
      command: () => this.handleLogout(),
    },
  ]
  mobileLinks: MenuItem[] = []

  @Input() isHome: boolean = false

  private readonly store$ = inject(Store<IAppState>)
  private readonly actions$ = inject(Actions)
  private readonly router = inject(Router)

  get isLoggedIn() {
    return this.user !== null
  }

  get homeCssClass() {
    return { 'home-style': this.isHome }
  }

  ngOnInit() {
    this.isLoggingOut$ = this.store$.pipe(select(selectors.selectIsLoggingOut))

    this.userSub = this.store$
      .select(selectors.selectLoggedInUser)
      .subscribe((user) => {
        this.user = user
        this.loadMobileLinks()
      })

    this.basketCountSub = this.store$
      .select(selectors.selectBasketCount)
      .subscribe((count) => {
        this.basketCount = count
        this.loadMobileLinks()
      })

    this.logoutSub = this.actions$
      .pipe(ofType(actions.logoutSuccessResponse))
      .subscribe(() => this.router.navigate(['/']))
  }

  loadMobileLinks() {
    this.mobileLinks = [
      {
        label: 'Shop',
        icon: 'pi pi-shopping-bag',
        routerLink: '/shop',
      },
      {
        label: 'Cart',
        badge: this.basketCount.toString(),
        icon: 'pi pi-shopping-cart',
        routerLink: '/basket',
      },
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: '/auth/login',
        visible: !this.isLoggedIn,
      },
      {
        label: 'Register',
        icon: 'pi pi-user',
        routerLink: '/auth/register',
        visible: !this.isLoggedIn,
      },
      {
        label: 'Account',
        icon: 'pi pi-user',
        routerLink: '/account',
        visible: this.isLoggedIn,
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Orders',
        icon: 'pi pi-book',
        routerLink: '/account/orders',
        visible: this.isLoggedIn,
      },
      {
        separator: true,
        visible: this.isLoggedIn,
      },
      {
        label: 'Logout',
        icon: 'pi pi-power-off',
        visible: this.isLoggedIn,
        command: this.handleLogout.bind(this),
      },
    ]
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu
  }

  handleLogout() {
    this.store$.dispatch(actions.logout())
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
    this.basketCountSub.unsubscribe()
    this.logoutSub.unsubscribe()
  }
}
