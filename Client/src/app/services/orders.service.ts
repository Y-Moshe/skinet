import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of, tap } from 'rxjs'

import { ICreateOrder, IDeliveryMethod, IOrder } from '@/types'
import { environment } from 'src/environments/environment'

const baseUrl = environment.apiUrl + '/orders'
const USE_CACHE = environment.useCache

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  deliveryMethods?: IDeliveryMethod[]

  constructor(private httpService: HttpClient) {}

  placeOrder(orderFields: ICreateOrder): Observable<IOrder> {
    return this.httpService
      .post<IOrder>(baseUrl, orderFields)
  }

  getUserOrders(): Observable<IOrder[]> {
    return this.httpService
      .get<IOrder[]>(baseUrl)
  }

  getUserOrder(id: number): Observable<IOrder> {
    return this.httpService.get<IOrder>(`${baseUrl}/${id}`)
  }

  getDeliveryMethods(useCache = USE_CACHE): Observable<IDeliveryMethod[]> {
    if (useCache && this.deliveryMethods) return of(this.deliveryMethods)

    return this.httpService
      .get<IDeliveryMethod[]>(`${baseUrl}/delivery-methods`)
      .pipe(tap((methods) => (this.deliveryMethods = methods)))
  }
}
