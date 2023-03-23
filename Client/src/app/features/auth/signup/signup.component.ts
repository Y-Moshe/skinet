import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import { Store, select } from '@ngrx/store'
import { AuthService } from '@/services'
import { IAppState, actions, selectors } from '@/store'
import { Actions, ofType } from '@ngrx/effects'
import { Router } from '@angular/router'
import { lastValueFrom, Observable, Subscription } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup
  isSubmitting$!: Observable<boolean>
  signupSuccessSub!: Subscription
  signupErrorSub!: Subscription

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      lastName: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.emailExistsValidator.bind(this)],
        updateOn: 'blur',
      }),
      password: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    })

    this.isSubmitting$ = this.store.pipe(select(selectors.selectIsSubmitting))

    this.signupSuccessSub = this.actions$
      .pipe(ofType(actions.registerSuccessResponse))
      .subscribe(() => this.router.navigate(['/']))

    this.signupErrorSub = this.actions$
      .pipe(ofType(actions.registerErrorResponse))
      .subscribe((error) => {
        this.signupForm.enable()
        console.log('error', error)
      })
  }

  async emailExistsValidator(control: AbstractControl) {
    const emailAddress = control.value
    try {
      const isExists = await lastValueFrom(
        this.authService.isEMailExists(emailAddress)
      )

      if (isExists) return { emailExists: true }
      else return null
    } catch (error) {
      console.log('Failed to check email availability')
      return null
    }
  }

  hasError(fieldName: string, errorName: string) {
    const ctrl = this.signupForm.get(fieldName)
    return ctrl?.touched && ctrl?.hasError(errorName)
  }

  handleSubmit(event: Event) {
    event.preventDefault()
    if (this.signupForm.invalid) return
    this.signupForm.disable()

    const userData = { ...this.signupForm.value }
    this.store.dispatch(actions.register(userData))
  }

  ngOnDestroy(): void {
    this.signupErrorSub.unsubscribe()
    this.signupErrorSub.unsubscribe()
  }
}
