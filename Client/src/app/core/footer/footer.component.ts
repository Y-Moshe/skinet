import { Component } from '@angular/core'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  socialLinks = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/moshe-nehemiah-254506155/',
      iconClass: 'pi pi-linkedin',
      color: '#0A66C2',
    },
    {
      label: 'Github',
      href: 'https://github.com/Y-Moshe',
      iconClass: 'pi pi-github',
      color: '#242424',
    },
    {
      label: 'Portfolio',
      href: 'https://moshe-nehemiah-portfolio.netlify.app/',
      iconClass: 'pi pi-external-link',
      color: 'grey',
    },
  ]
}
