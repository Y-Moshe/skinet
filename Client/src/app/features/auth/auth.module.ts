import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { AuthRoutingModule } from './auth-routing.module'
import { AppPrimeNGModule } from '@/app-primeng.module'
import { PushModule } from '@ngrx/component'

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppPrimeNGModule,
    AuthRoutingModule,
    PushModule,
  ],
})
export class AuthModule {}
