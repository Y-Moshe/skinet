import { Component, inject, OnInit } from '@angular/core'
import { BreadcrumbDefinition, BreadcrumbService } from 'xng-breadcrumb'
import { map, Observable } from 'rxjs'
import { BreadcrumbFunction } from 'xng-breadcrumb/lib/types/breadcrumb.config'

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
})
export class SubheaderComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService)
  breadcrumbs$!: Observable<BreadcrumbDefinition[]>

  ngOnInit(): void {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$
  }

  getLastBreadcrumbRouteLabel(breadcrumbs: BreadcrumbDefinition[]): string {
    return (breadcrumbs.at(breadcrumbs.length - 1)?.label as string) || ''
  }
}
