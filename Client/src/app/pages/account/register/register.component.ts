import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { Store, select } from '@ngrx/store'
import { AuthService, NotificationService } from '@/services'
import { IAppState, actions, selectors } from '@/store'
import { Actions, ofType } from '@ngrx/effects'
import { Router } from '@angular/router'
import { PushModule } from '@ngrx/component'
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

import { PasswordModule } from 'primeng/password'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    PushModule,
    InputTextModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup
  isSubmitting$!: Observable<boolean>
  registerSuccessSub!: Subscription
  registerErrorSub!: Subscription

  constructor(
    private fb: FormBuilder,
    private store$: Store<IAppState>,
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
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

    this.registerSuccessSub = this.actions$
      .pipe(ofType(actions.registerSuccessResponse))
      .subscribe(() => {
        this.router.navigate(['/'])
        this.notificationService.registerSuccess()
      })

    this.registerErrorSub = this.actions$
      .pipe(ofType(actions.registerErrorResponse))
      .subscribe((error) => {
        this.registerForm.enable()
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
    const ctrl = this.registerForm.get(fieldName)
    return ctrl?.touched && ctrl?.hasError(errorName)
  }

  handleSubmit(event: Event) {
    event.preventDefault()
    if (this.registerForm.invalid) return
    this.registerForm.disable()

    const userData = { ...this.registerForm.value }
    this.store$.dispatch(actions.register(userData))
  }

  ngOnDestroy(): void {
    this.registerSuccessSub.unsubscribe()
    this.registerErrorSub.unsubscribe()
  }
}
