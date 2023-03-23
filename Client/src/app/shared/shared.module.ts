import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { CommonInputComponent } from './common-input/common-input.component'
import { AppPrimeNGModule } from '@/app-primeng.module'

@NgModule({
  declarations: [CommonInputComponent],
  imports: [CommonModule, AppPrimeNGModule, ReactiveFormsModule],
  exports: [CommonInputComponent],
})
export class SharedModule {}
