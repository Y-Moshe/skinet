import { inject } from '@angular/core'
import { ResolveFn, Router } from '@angular/router'
import { Observable, catchError, map, of } from 'rxjs'

import { NotificationService, ShopService } from '@/services'
import { IErrorResponse, IProduct } from '@/types'

export const ProductResolver: ResolveFn<Observable<IProduct | null>> = (
  route
) => {
  const router = inject(Router)
  const shopService = inject(ShopService)
  const notificationService = inject(NotificationService)

  const productId = route.paramMap.get('id')
  if (!productId) return of(null) // To allow edit product

  if (isNaN(productId as any)) {
    notificationService.notifyAtBottomMiddle({
      summary: 'Shop API',
      detail: 'Invalid product id',
      severity: 'warn',
    })

    router.navigate(['/shop'])
    return of(null)
  }

  return shopService.getProduct(+productId).pipe(
    catchError(
      map((err: IErrorResponse) => {
        notificationService.notifyAtBottomMiddle({
          summary: 'Shop API',
          detail: err.message,
          severity: 'error',
        })

        router.navigate(['/shop'])
        return null
      })
    )
  )
}
