import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { BreadcrumbService } from 'xng-breadcrumb'
import { lastValueFrom, map, Observable, Subscription } from 'rxjs'
import { startCase } from 'lodash'

import { IBrand, ICategory, IProduct } from '@/types'
import { NotificationService, ShopService } from '@/services'
import { IAppState, actions, selectors } from '@/store'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
})
export class EditProductComponent implements OnInit, OnDestroy {
  isLoading: boolean = true
  product!: IProduct | null
  productSub!: Subscription
  productForm!: FormGroup

  brands$!: Observable<IBrand[]>
  categories$!: Observable<ICategory[]>

  private readonly store$ = inject(Store<IAppState>)
  private readonly fb = inject(FormBuilder)
  private readonly route = inject(ActivatedRoute)
  private readonly shopService = inject(ShopService)
  private readonly breadcrumbService = inject(BreadcrumbService)
  private readonly notificationService = inject(NotificationService)

  get controlList() {
    return ['name', 'description', 'price', 'pictureUrl']
  }

  ngOnInit(): void {
    this.initialProductForm()
    this.loadProduct()
    this.loadDropdownData()
  }

  initialProductForm() {
    this.productForm = this.fb.group({
      id: this.fb.control({ disabled: true, value: null }),
      name: this.fb.control('', {
        validators: [Validators.required],
      }),
      description: this.fb.control('', {
        validators: [Validators.required],
      }),
      price: this.fb.control(1, {
        validators: [Validators.required, Validators.min(1)],
      }),
      pictureUrl: this.fb.control('', {
        validators: [Validators.required],
      }),
      brandId: this.fb.control(null, {
        validators: [Validators.required],
      }),
      categoryId: this.fb.control(null, {
        validators: [Validators.required],
      }),
    })
  }

  loadProduct() {
    this.productSub = this.route.data
      .pipe(map((data: any) => data.product as IProduct))
      .subscribe((product) => {
        this.product = product
        this.setPageTitle()
        this.productForm.patchValue({
          ...product,
          brandId: product?.brand?.id,
          categoryId: product?.category?.id,
        })
        // To avoid change detection problem in case of "add product"
        // In case of edit product it works well even without the timeout
        setTimeout(() => (this.isLoading = false), 100)
      })
  }

  loadDropdownData() {
    // It is fine since it will use cached data from the service if exists
    // And if not, an http request will be made
    this.store$.dispatch(actions.loadShop())

    this.brands$ = this.store$.select(selectors.selectBrands)
    this.categories$ = this.store$.select(selectors.selectCategories)
  }

  setPageTitle() {
    const title = this.product?.id
      ? `Edit ${this.product!.name}`
      : 'Add Product'
    this.breadcrumbService.set('@productName', title)
  }

  hasError(fieldName: string, errorName: string) {
    const ctrl = this.productForm.get(fieldName)
    return ctrl?.touched && ctrl?.hasError(errorName)
  }

  getControlLabel(camelCaseName: string) {
    return startCase(camelCaseName)
  }

  async handleSubmit(event: Event) {
    event.preventDefault()
    if (this.productForm.invalid) return
    this.productForm.disable()

    try {
      await lastValueFrom(this.shopService.saveProduct(this.productForm.value))

      this.notificationService.notifyAtBottomMiddle({
        summary: 'Products API',
        detail: 'The product has been successfully saved!',
        severity: 'success',
      })
    } catch (err: any) {
      this.notificationService.notifyAtBottomMiddle({
        summary: 'Products API',
        detail: err.message,
        severity: 'error',
      })
    } finally {
      this.productForm.enable()
    }
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe()
  }
}
