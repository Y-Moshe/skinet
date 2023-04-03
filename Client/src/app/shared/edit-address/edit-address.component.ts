import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { Subscription } from 'rxjs'
import { startCase } from 'lodash'

import { NotificationService } from '@/services'
import { IAppState, actions, selectors } from '@/store'
import { IAddress } from '@/types'

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
})
export class EditAddressComponent {
  isEditMode = false
  addressForm!: FormGroup

  address: IAddress | null = null
  addressSub!: Subscription
  addressSuccessSub!: Subscription
  addressFailedSub!: Subscription

  constructor(
    private store$: Store<IAppState>,
    private actions$: Actions,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      street: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]),
      state: this.fb.control('', [Validators.required]),
      zipCode: this.fb.control('', [Validators.required]),
    })

    this.addressSub = this.store$
      .select(selectors.selectUserAddress)
      .subscribe((address) => {
        if (!address) return this.store$.dispatch(actions.getUserAddress())

        this.address = address
        address && this.addressForm.patchValue({ ...address })
      })

    this.addressSuccessSub = this.actions$
      .pipe(ofType(actions.saveUserAddressSuccessResponse))
      .subscribe(() => {
        this.addressForm.enable()
        this.isEditMode = false
        this.notificationService.notifyAtBottomMiddle({
          summary: 'Account',
          severity: 'success',
          detail: 'Address saved successfully!',
        })
      })

    this.addressFailedSub = this.actions$
      .pipe(ofType(actions.saveUserAddressErrorResponse))
      .subscribe(() => {
        this.addressForm.enable()
        this.notificationService.notifyAtBottomMiddle({
          summary: 'Account',
          severity: 'error',
          detail: 'Failed to save your address',
        })
      })
  }

  getFormDisplayStyle() {
    return this.isEditMode ? 'flex !important' : 'none !important'
  }

  getControlNames() {
    return Object.keys(this.addressForm.value)
  }

  getControlLabel(camelCaseName: string) {
    return startCase(camelCaseName)
  }

  hasError(fieldName: string, errorName: string) {
    const ctrl = this.addressForm.get(fieldName)
    return ctrl?.touched && ctrl?.hasError(errorName)
  }

  handleSubmit(event: Event) {
    event.preventDefault()
    const address = this.addressForm.value as IAddress
    this.addressForm.disable()
    this.addressForm.markAsPending()
    this.store$.dispatch(actions.saveUserAddress({ address }))
  }

  ngOnDestroy(): void {
    this.addressSub.unsubscribe()
    this.addressSuccessSub.unsubscribe()
    this.addressFailedSub.unsubscribe()
  }
}
