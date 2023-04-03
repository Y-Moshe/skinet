import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

import { IDeliveryMethod } from '@/types'
import { environment } from 'src/environments/environment'

const baseUrl = environment.apiUrl + '/checkout'

const tempMethods: IDeliveryMethod[] = [
  {
    id: 1,
    shortName: 'UPS',
    deliveryTime: 'within 2 business days',
    description: 'Fastest delivery',
    price: 50,
  },
  {
    id: 2,
    shortName: 'FedEx',
    deliveryTime: 'within 4 business days',
    description: 'Fastest delivery',
    price: 50,
  },
]

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private httpService: HttpClient) {}

  getDeliveryMethods(): Observable<IDeliveryMethod[]> {
    return of(tempMethods)
    // return this.httpService.get<IDeliveryMethod[]>(
    //   `${baseUrl}/delivery-methods`
    // )
  }
}
