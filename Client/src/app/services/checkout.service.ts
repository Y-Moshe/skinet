import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { ICreateOrder, IDeliveryMethod, IOrder } from '@/types'
import { environment } from 'src/environments/environment'

const baseUrl = environment.apiUrl + '/orders'

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private httpService: HttpClient) {}

  placeOrder(orderFields: ICreateOrder): Observable<IOrder> {
    return this.httpService.post<IOrder>(baseUrl, orderFields)
  }

  getUserOrders(): Observable<IOrder[]> {
    return this.httpService.get<IOrder[]>(baseUrl)
  }

  getUserOrder(id: number): Observable<IOrder> {
    return this.httpService.get<IOrder>(`${baseUrl}/${id}`)
  }

  getDeliveryMethods(): Observable<IDeliveryMethod[]> {
    return this.httpService.get<IDeliveryMethod[]>(
      `${baseUrl}/delivery-methods`
    )
  }
}
