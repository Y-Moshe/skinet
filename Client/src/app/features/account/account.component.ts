import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { Store } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { Subscription } from 'rxjs'

import { AddressFormComponent } from '@/shared/address-form/address-form.component'
import { NotificationService } from '@/services'
import { actions, IAppState, selectors } from '@/store'
import { IAddress, IUser } from '@/types'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit, OnDestroy {
  @ViewChild('addressForm') addressComponentRef!: AddressFormComponent
  user: IUser | null = null
  isEditMode = false

  userSub!: Subscription
  addressSuccessSub!: Subscription
  addressFailedSub!: Subscription

  constructor(
    private store$: Store<IAppState>,
    private actions$: Actions,
    private cd: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userSub = this.store$
      .select(selectors.selectLoggedInUser)
      .subscribe((user) => {
        if (user && !user.address)
          this.store$.dispatch(actions.getUserAddress())

        this.user = user
        this.cd.detectChanges()
        user?.address && this.setFormValue(user.address)
      })

    this.addressSuccessSub = this.actions$
      .pipe(ofType(actions.saveUserAddressSuccessResponse))
      .subscribe(() => {
        this.enableAddressForm()
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
        this.enableAddressForm()
        this.notificationService.notifyAtBottomMiddle({
          summary: 'Account',
          severity: 'error',
          detail: 'Failed to save your address',
        })
      })
  }

  setFormValue(formValue: IAddress) {
    this.addressComponentRef &&
      this.addressComponentRef.addressForm.patchValue({ ...formValue })
  }

  disableAddressForm() {
    this.addressComponentRef && this.addressComponentRef.addressForm.disable()
  }

  enableAddressForm() {
    this.addressComponentRef && this.addressComponentRef.addressForm.enable()
  }

  handleSubmit(address: IAddress) {
    this.disableAddressForm()
    this.store$.dispatch(actions.saveUserAddress({ address }))
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
    this.addressSuccessSub.unsubscribe()
    this.addressFailedSub.unsubscribe()
  }
}
