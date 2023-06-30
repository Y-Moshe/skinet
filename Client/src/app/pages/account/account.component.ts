import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { LetModule } from '@ngrx/component'
import { Observable } from 'rxjs'

import { IAppState, selectors } from '@/store'
import { IUser } from '@/types'
import { EditAddressComponent } from '@/components'

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [EditAddressComponent, LetModule],
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  user$!: Observable<IUser | null>

  constructor(private store$: Store<IAppState>) {}

  ngOnInit(): void {
    this.user$ = this.store$.select(selectors.selectLoggedInUser)
  }
}
