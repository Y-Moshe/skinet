import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import {
  IPaginateResponse,
  IProduct,
  IProductBrand,
  IProductType,
} from '@/types'
import { environment } from '../../environments/environment'

const baseUrl = environment.apiUrl + '/products'

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private httpService: HttpClient) {}

  public getProducts(filterBy = {}): Observable<IPaginateResponse<IProduct>> {
    return this.httpService.get<IPaginateResponse<IProduct>>(baseUrl, {
      params: filterBy as any,
    })
  }
  public getProductTypes(): Observable<IProductType[]> {
    return this.httpService.get<IProductType[]>(baseUrl + '/types')
  }

  public getProductBrands(): Observable<IProductBrand[]> {
    return this.httpService.get<IProductBrand[]>(baseUrl + '/brands')
  }

  public getProduct(id: number): Observable<IProduct> {
    return this.httpService.get<IProduct>(`${baseUrl}/${id}`)
  }
}
