import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { IBasket } from '@/types'
import { environment } from 'src/environments/environment'

const baseUrl = environment.apiUrl + '/payments'

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpService: HttpClient) {}

  createPaymentIntent(basketId: string): Observable<IBasket> {
    return this.httpService.post<IBasket>(`${baseUrl}/${basketId}`, {})
  }
}
