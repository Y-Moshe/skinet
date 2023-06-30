import { CommonModule } from '@angular/common'
import { Component, ElementRef, ViewChild } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  host: {
    class: 'full',
  },
})
export class HomeComponent {
  features = [
    {
      iconClass: 'pi pi-shopping-cart feature-icon',
      title: 'E-Commerce',
      description: `
        The toyz shop application is provided with a set rich of features including search,
        filter, sorting, pagination, shopping cart checkout process with steps (stepper),
        and a payment setup with stripe service.`,
    },
    {
      iconClass: 'pi pi-mobile feature-icon',
      title: 'Responsive design',
      description: `
        Application provided with the fully supported responsive design following
        the "Mobile first design" and using reusable grid system from bootstrap playing
        along with this app to provide responsiveness.`,
    },
    {
      iconClass: 'pi pi-lock feature-icon',
      title: 'Security',
      description: `
        A High-level of security is implemented, limiting login tries up to 5 attempts(Suspend time 1min),
        and Payments security PCI-DSS is provided by Stripe and More.`,
    },
  ]

  @ViewChild('howWorks') howWorksSection!: ElementRef<HTMLDivElement>

  scrollToWorks() {
    this.howWorksSection.nativeElement?.scrollIntoView({ behavior: 'smooth' })
  }
}
