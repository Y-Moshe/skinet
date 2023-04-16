import { Component, Input, OnInit, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { BreadcrumbService } from 'xng-breadcrumb'
import { Observable, tap } from 'rxjs'

import { OrdersService } from '@/services'
import { IOrder } from '@/types'

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
})
export class OrderDetailsComponent implements OnInit {
  @Input() order$!: Observable<IOrder>

  private readonly route = inject(ActivatedRoute)
  private readonly ordersService = inject(OrdersService)
  private readonly breadcrumbService = inject(BreadcrumbService)

  ngOnInit(): void {
    const orderId = +this.route.snapshot.params['id']
    this.order$ = this.ordersService
      .getUserOrder(orderId)
      .pipe(
        tap((order) =>
          this.breadcrumbService.set('@orderNumber', 'Order #' + order.id!)
        )
      )
  }
}
