import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { map } from 'rxjs'

import { IAppState, selectors } from '@/store'
import { NotificationService } from '@/services'

export const CheckoutGuard: CanActivateFn = () => {
  const router = inject(Router)
  const notificationService = inject(NotificationService)
  const store$ = inject(Store<IAppState>)

  return store$.pipe(
    select(selectors.selectBasketCount),
    map((count) => {
      if (count <= 0) {
        notificationService.notifyAtTopRight({
          summary: 'Cart',
          detail: 'You have no items in your shopping cart!',
          severity: 'info',
        })
        router.navigate(['/shop'], { replaceUrl: true })
      }
      return count > 0
    })
  )
}
