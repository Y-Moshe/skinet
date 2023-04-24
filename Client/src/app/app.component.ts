import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { actions, IAppState } from '@/store'
import { PrimeNGConfig } from 'primeng/api'

import { HomeComponent } from './core/home/home.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isHomePage: boolean = false

  constructor(
    private primengConfig: PrimeNGConfig,
    private store: Store<IAppState>
  ) {}

  get mainViewCssClass() {
    return { 'my-4': !this.isHomePage }
  }

  ngOnInit(): void {
    this.primengConfig.ripple = false

    this.store.dispatch(actions.loadUser())
    this.store.dispatch(actions.loadBasket())
  }

  handleRouting(component: any) {
    this.isHomePage = component instanceof HomeComponent
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
}
