import { bootstrapApplication } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { NgxStripeModule } from 'ngx-stripe'
import { environment } from 'src/environments/environment'
import { MessageService } from 'primeng/api'
const { stripePublisableKey } = environment

import { AuthInterceptor } from '@/interceptors/auth.interceptor'
import { ErrorInterceptor } from '@/interceptors/error.interceptor'

import { AppComponent } from '@/app.component'
import { appRoutes } from '@/app-routes'
import { AppStoreModule } from '@/store'

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      NgxStripeModule.forRoot(stripePublisableKey),
      AppStoreModule,
      HttpClientModule,
      BrowserAnimationsModule
    ),
    provideRouter(appRoutes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    MessageService,
  ],
}).catch((err) => console.error(err))
