import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { Subscription } from 'rxjs'
import { startCase } from 'lodash'

import { NotificationService } from '@/services'
import { actions, IAppState, selectors } from '@/store'
import { IAddress, IUser } from '@/types'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  user: IUser | null = null
  addressForm!: FormGroup
  isEditMode = false
  isSaving = false

  userSub!: Subscription
  addressSuccessSub!: Subscription
  addressFailedSub!: Subscription

  constructor(
    private store$: Store<IAppState>,
    private actions$: Actions,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  buildForm(address: IAddress | undefined) {
    this.addressForm = this.fb.group({
      firstName: this.fb.control(address?.firstName, [Validators.required]),
      lastName: this.fb.control(address?.lastName, [Validators.required]),
      street: this.fb.control(address?.street, [Validators.required]),
      city: this.fb.control(address?.city, [Validators.required]),
      state: this.fb.control(address?.state, [Validators.required]),
      zipCode: this.fb.control(address?.zipCode, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.userSub = this.store$
      .select(selectors.selectLoggedInUser)
      .subscribe((user) => {
        if (user && !user.address)
          this.store$.dispatch(actions.getUserAddress())

        this.user = user
        this.buildForm(user?.address)
      })

    this.addressSuccessSub = this.actions$
      .pipe(ofType(actions.saveUserAddressSuccessResponse))
      .subscribe(() => {
        this.isSaving = false
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
        this.isSaving = false
        this.notificationService.notifyAtBottomMiddle({
          summary: 'Account',
          severity: 'error',
          detail: 'Failed to save your address',
        })
      })
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
    this.isSaving = true

    const address = this.addressForm.value
    this.store$.dispatch(actions.saveUserAddress({ address }))
  }
}
