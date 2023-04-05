import { IAppState, selectors } from '@/store'
import { Component, OnInit, inject } from '@angular/core'
import { Observable } from 'rxjs'

import { Store } from '@ngrx/store'
import { IBasket } from '@/types'

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
})
export class OrderReviewComponent implements OnInit {
  private readonly store$ = inject(Store<IAppState>)
  basket$!: Observable<IBasket>

  ngOnInit(): void {
    this.basket$ = this.store$.select(selectors.selectBasket)
  }
}
