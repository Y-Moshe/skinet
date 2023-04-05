import { Component, OnInit, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, take } from 'rxjs'

import { IAppState, selectors } from '@/store'
import { IBasketState } from '@/store/reducers/basket'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent implements OnInit {
  basketState$!: Observable<IBasketState>
  orderNumber!: number
  orderDate!: Date

  private readonly store$ = inject(Store<IAppState>)
  private readonly route = inject(ActivatedRoute)

  ngOnInit(): void {
    this.orderNumber = this.route.snapshot.queryParams['id']
    this.orderDate = this.route.snapshot.queryParams['date']

    this.basketState$ = this.store$
      .select(selectors.selectBasketState)
      .pipe(take(1))
  }
}
