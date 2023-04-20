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
import { AccordionModule } from 'primeng/accordion'
import { ListboxModule } from 'primeng/listbox'
import { DropdownModule } from 'primeng/dropdown'
import { PaginatorModule } from 'primeng/paginator'
import { BlockUIModule } from 'primeng/blockui'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { TagModule } from 'primeng/tag'
import { PanelModule } from 'primeng/panel'
import { TooltipModule } from 'primeng/tooltip'
import { InputNumberModule } from 'primeng/inputnumber'
import { DividerModule } from 'primeng/divider'
import { ProgressBarModule } from 'primeng/progressbar'
import { TableModule } from 'primeng/table'
import { StepsModule } from 'primeng/steps'
import { RadioButtonModule } from 'primeng/radiobutton'
import { MessageModule } from 'primeng/message'
import { SidebarModule } from 'primeng/sidebar'

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
    AccordionModule,
    ListboxModule,
    DropdownModule,
    PaginatorModule,
    BlockUIModule,
    ProgressSpinnerModule,
    TagModule,
    PanelModule,
    TooltipModule,
    InputNumberModule,
    DividerModule,
    ProgressBarModule,
    TableModule,
    StepsModule,
    RadioButtonModule,
    MessageModule,
    SidebarModule,
  ],
  providers: [MessageService],
})
export class AppPrimeNGModule {}
