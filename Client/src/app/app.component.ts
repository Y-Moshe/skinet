import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { PrimeNGConfig } from 'primeng/api'
import { ToastModule } from 'primeng/toast'

import { Store } from '@ngrx/store'
import { actions, IAppState } from '@/store'

import { HomeComponent } from '@/pages/home/home.component'
import {
  FooterComponent,
  HeaderComponent,
  SubheaderComponent,
} from '@/components'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    SubheaderComponent,
    ToastModule,
  ],
  standalone: true,
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
