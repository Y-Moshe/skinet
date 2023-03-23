import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { IBasket } from '@/types'
import { environment } from 'src/environments/environment'

const baseUrl = environment.apiUrl + '/basket'

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private httpService: HttpClient) {}

  getBasket(id: string): Observable<IBasket> {
    return this.httpService.get<IBasket>(baseUrl + '/' + id)
  }

  updateBasket(basket: IBasket): Observable<IBasket> {
    return this.httpService.put<IBasket>(baseUrl, basket)
  }

  deleteBasket(id: string): Observable<void> {
    return this.httpService.delete<void>(baseUrl + '/' + id)
  }
}
