import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PushModule } from '@ngrx/component'

import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { HomeComponent } from './home/home.component'
import { E404Component } from './e404/e404.component'

import { AppRoutingModule } from '../app-routing.module'
import { AppPrimeNGModule } from '../app-primeng.module'
import { SubheaderComponent } from './subheader/subheader.component'

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    E404Component,
    SubheaderComponent,
  ],
  imports: [CommonModule, AppRoutingModule, AppPrimeNGModule, PushModule],
  exports: [HeaderComponent, FooterComponent, SubheaderComponent],
})
export class CoreModule {}
