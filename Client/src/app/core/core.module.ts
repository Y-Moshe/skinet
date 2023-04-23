import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LetModule, PushModule } from '@ngrx/component'
import { BreadcrumbModule } from 'xng-breadcrumb'

import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { HomeComponent } from './home/home.component'
import { E404Component } from './e404/e404.component'

import { AppRoutingModule } from '../app-routing.module'
import { AppPrimeNGModule } from '../app-primeng.module'
import { SubheaderComponent } from './subheader/subheader.component'
import { SharedModule } from '@/shared/shared.module'

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    E404Component,
    SubheaderComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AppPrimeNGModule,
    SharedModule,
    PushModule,
    LetModule,
    BreadcrumbModule,
  ],
  exports: [HeaderComponent, FooterComponent, SubheaderComponent],
})
export class CoreModule {}
