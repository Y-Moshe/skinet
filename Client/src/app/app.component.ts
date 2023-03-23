import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { actions, IAppState } from '@/store'
import { PrimeNGConfig } from 'primeng/api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = false
    this.store.dispatch(actions.loadUser())
  }
}
