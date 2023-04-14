import { Component, Input, OnInit, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'

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

  ngOnInit(): void {
    const orderId = +this.route.snapshot.params['id']
    this.order$ = this.ordersService.getUserOrder(orderId)
  }
}
