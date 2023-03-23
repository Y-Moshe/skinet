import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import { Store, select } from '@ngrx/store'
import { ofType, Actions } from '@ngrx/effects'
import { IAppState, actions, selectors } from '@/store'
import { Router } from '@angular/router'
import { lastValueFrom, Observable, Subscription } from 'rxjs'
import { AuthService } from '@/services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup
  isSubmitting$!: Observable<boolean>
  loginSuccessSub!: Subscription
  loginErrorSub!: Subscription

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.emailNotExistsValidator.bind(this)],
        updateOn: 'blur',
      }),
      password: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    })

    this.isSubmitting$ = this.store.pipe(select(selectors.selectIsSubmitting))

    this.loginSuccessSub = this.actions$
      .pipe(ofType(actions.loginSuccessResponse))
      .subscribe(() => this.router.navigate(['/']))

    this.loginErrorSub = this.actions$
      .pipe(ofType(actions.loginErrorResponse))
      .subscribe((error) => {
        this.loginForm.enable()
        console.log('error', error)
      })
  }

  async emailNotExistsValidator(control: AbstractControl) {
    const emailAddress = control.value
    try {
      const isExists = await lastValueFrom(
        this.authService.isEMailExists(emailAddress)
      )

      if (!isExists) return { emailNotExists: true }
      else return null
    } catch (error) {
      console.log('Failed to check email availability')
      return null
    }
  }

  hasError(fieldName: string, errorName: string) {
    const ctrl = this.loginForm.get(fieldName)
    return ctrl?.touched && ctrl?.hasError(errorName)
  }

  handleSubmit(event: Event) {
    event.preventDefault()
    if (this.loginForm.invalid) return
    this.loginForm.disable()

    const credintials = { ...this.loginForm.value }
    this.store.dispatch(actions.login(credintials))
  }

  ngOnDestroy(): void {
    this.loginSuccessSub.unsubscribe()
    this.loginErrorSub.unsubscribe()
  }
}
