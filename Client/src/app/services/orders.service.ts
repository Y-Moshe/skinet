import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, delay, of } from 'rxjs'

import { ICreateOrder, IDeliveryMethod, IOrder } from '@/types'
import { environment } from 'src/environments/environment'

const baseUrl = environment.apiUrl + '/orders'
const USE_CACHE = environment.useCache

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  deliveryMethods?: IDeliveryMethod[]
  userOrders?: IOrder[]

  constructor(private httpService: HttpClient) {}

  placeOrder(orderFields: ICreateOrder): Observable<IOrder> {
    return this.httpService.post<IOrder>(baseUrl, orderFields)
  }

  getUserOrders(useCache = USE_CACHE): Observable<IOrder[]> {
    if (useCache && this.userOrders) return of(this.userOrders)

    return this.httpService.get<IOrder[]>(baseUrl)
  }

  getUserOrder(id: number, useCache = USE_CACHE): Observable<IOrder> {
    if (useCache && this.userOrders) {
      const order = this.userOrders.find((o) => o.id === id)
      if (order) return of(order).pipe(delay(10))
    }

    return this.httpService.get<IOrder>(`${baseUrl}/${id}`)
  }

  getDeliveryMethods(useCache = USE_CACHE): Observable<IDeliveryMethod[]> {
    if (useCache && this.deliveryMethods) return of(this.deliveryMethods)

    return this.httpService.get<IDeliveryMethod[]>(
      `${baseUrl}/delivery-methods`
    )
  }
}
