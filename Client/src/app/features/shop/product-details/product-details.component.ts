import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { catchError, map, Observable, startWith } from 'rxjs'

import { NotificationService, ShopService } from '@/services'
import { IErrorResponse, IProduct } from '@/types'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<IProduct | null>
  quantity = 1

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.params['id']
    this.product$ = this.shopService.getProduct(productId).pipe(
      startWith(null),
      catchError(
        map((err: IErrorResponse) => {
          this.notificationService.notifyAtBottomMiddle({
            detail: err.message,
            severity: 'error',
          })

          return null
        })
      )
    )
  }

  handleAddToBasket() {
    console.log('TODO: Add to basket')
  }
}
