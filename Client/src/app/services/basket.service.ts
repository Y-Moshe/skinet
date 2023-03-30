import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import * as cuid from 'cuid'

import { IBasket } from '@/types'
import { environment } from 'src/environments/environment'
import { utilsService } from './utils.service'

const baseUrl = environment.apiUrl + '/basket'
const STORAGE_KEY = 'basketId'

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private httpService: HttpClient) {}

  getBasket(id: string): Observable<IBasket> {
    return this.httpService.get<IBasket>(`${baseUrl}/${id ?? cuid()}`)
  }

  updateBasket(basket: IBasket): Observable<IBasket> {
    return this.httpService.put<IBasket>(baseUrl, basket)
  }

  deleteBasket(id: string): Observable<void> {
    return this.httpService.delete<void>(`${baseUrl}/${id}`)
  }

  public saveBasketId(id: string): void {
    utilsService.saveToStorage(STORAGE_KEY, id)
  }

  public loadBasketId(): string | null {
    return utilsService.loadFromStorage<string>(STORAGE_KEY)
  }

  public clearBasketId(): void {
    localStorage.removeItem(STORAGE_KEY)
  }
}
