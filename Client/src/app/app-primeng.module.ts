import { NgModule } from '@angular/core'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { MenuModule } from 'primeng/menu'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { MegaMenuModule } from 'primeng/megamenu'
import { CardModule } from 'primeng/card'
import { ImageModule } from 'primeng/image'
import { ToastModule } from 'primeng/toast'

@NgModule({
  exports: [
    ButtonModule,
    MenuModule,
    InputTextModule,
    PasswordModule,
    MegaMenuModule,
    CardModule,
    ImageModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class AppPrimeNGModule {}
