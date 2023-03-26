import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { Store, select } from '@ngrx/store'
import { AuthService, NotificationService } from '@/services'
import { IAppState, actions, selectors } from '@/store'
import { Actions, ofType } from '@ngrx/effects'
import { Router } from '@angular/router'
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subscription,
  switchMap,
  take,
} from 'rxjs'

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
    private store$: Store<IAppState>,
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.createDebounceEmailValidator.call(this)],
      }),
      password: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    })

    this.isSubmitting$ = this.store$.pipe(select(selectors.selectIsSubmitting))

    this.signupSuccessSub = this.actions$
      .pipe(ofType(actions.registerSuccessResponse))
      .subscribe(() => {
        this.router.navigate(['/'])
        this.notificationService.registerSuccess()
      })

    this.signupErrorSub = this.actions$
      .pipe(ofType(actions.registerErrorResponse))
      .subscribe((error) => {
        this.signupForm.enable()
        this.notificationService.registerError(error.message)
      })
  }

  createDebounceEmailValidator() {
    const subject = new BehaviorSubject<string>('')
    const debouncedInput$ = subject.asObservable().pipe(
      distinctUntilChanged(),
      debounceTime(500),
      switchMap((emailAddress) =>
        this.authService
          .isEMailExists(emailAddress)
          .pipe(map((isExists) => (isExists ? { emailExists: true } : null)))
      )
    )

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      subject.next(control.value)
      return debouncedInput$.pipe(take(1))
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
    this.store$.dispatch(actions.register(userData))
  }

  ngOnDestroy(): void {
    this.signupErrorSub.unsubscribe()
    this.signupErrorSub.unsubscribe()
  }
}
