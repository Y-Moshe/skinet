import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { IPaginateResponse, IProduct, IBrand, ICategory } from '@/types'
import { environment } from '../../environments/environment'

const baseUrl = environment.apiUrl

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private httpService: HttpClient) {}

  public getProducts(filterBy = {}): Observable<IPaginateResponse<IProduct>> {
    const params = filterBy as any
    return this.httpService.get<IPaginateResponse<IProduct>>(
      `${baseUrl}/products`,
      { params }
    )
  }

  public getProduct(id: number): Observable<IProduct> {
    return this.httpService.get<IProduct>(`${baseUrl}/products/${id}`)
  }

  public getCategories(): Observable<ICategory[]> {
    return this.httpService.get<ICategory[]>(`${baseUrl}/categories`)
  }

  public getCategory(id: number): Observable<ICategory> {
    return this.httpService.get<ICategory>(`${baseUrl}/categories/${id}`)
  }

  public getBrands(): Observable<IBrand[]> {
    return this.httpService.get<IBrand[]>(`${baseUrl}/brands`)
  }

  public getBrand(id: number): Observable<IBrand> {
    return this.httpService.get<IBrand>(`${baseUrl}/brands/${id}`)
  }
}
