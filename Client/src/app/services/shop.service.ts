import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { delay, Observable, of, tap } from 'rxjs'

import { IPaginateResponse, IProduct, IBrand, ICategory } from '@/types'
import { environment } from '../../environments/environment'

const baseUrl = environment.apiUrl
const USE_CACHE = environment.useCache

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  categoriesCache?: ICategory[]
  brandsCache?: IBrand[]

  productsQueryCache = new Map<string, IPaginateResponse<IProduct>>()

  constructor(private httpService: HttpClient) {}

  public getCategories(useCache = USE_CACHE): Observable<ICategory[]> {
    if (useCache && this.categoriesCache) return of(this.categoriesCache)

    return this.httpService
      .get<ICategory[]>(`${baseUrl}/categories`)
      .pipe(tap((categories) => (this.categoriesCache = categories)))
  }

  // public getCategory(id: number): Observable<ICategory> {
  //   return this.httpService.get<ICategory>(`${baseUrl}/categories/${id}`)
  // }

  public getBrands(useCache = USE_CACHE): Observable<IBrand[]> {
    if (useCache && this.brandsCache) return of(this.brandsCache)

    return this.httpService
      .get<IBrand[]>(`${baseUrl}/brands`)
      .pipe(tap((brands) => (this.brandsCache = brands)))
  }

  // public getBrand(id: number): Observable<IBrand> {
  //   return this.httpService.get<IBrand>(`${baseUrl}/brands/${id}`)
  // }

  public getProducts(
    filterBy = {},
    useCache = USE_CACHE
  ): Observable<IPaginateResponse<IProduct>> {
    const queryCacheKey = Object.values(filterBy).join('-')

    if (useCache && this.productsQueryCache.has(queryCacheKey))
      return of(this.productsQueryCache.get(queryCacheKey)!)

    const params = { ...filterBy } as any
    if (params?.brandIds) params.brandIds = params.brandIds.toString()

    return this.httpService
      .get<IPaginateResponse<IProduct>>(`${baseUrl}/products`, { params })
      .pipe(
        tap((response) => this.productsQueryCache.set(queryCacheKey, response))
      )
  }

  public getProduct(id: number, useCache = USE_CACHE): Observable<IProduct> {
    if (useCache && this.productsQueryCache.size) {
      const product = this.getProductFromCache(id)
      if (product) return of(product).pipe(delay(10))
    }

    return this.httpService.get<IProduct>(`${baseUrl}/products/${id}`)
  }

  private getProductFromCache(id: number): IProduct | undefined {
    let i = this.productsQueryCache.size
    const cache = this.productsQueryCache.values()
    let product: IProduct | undefined = undefined

    while (i > 0) {
      const products = (cache.next().value as IPaginateResponse<IProduct>).data
      product = products.find((p) => p.id === id)

      if (product) break
      i--
    }

    return product
  }
}
