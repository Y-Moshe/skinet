import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LetModule } from '@ngrx/component'
import {
  BreadcrumbDefinition,
  BreadcrumbModule,
  BreadcrumbService,
} from 'xng-breadcrumb'
import { Observable } from 'rxjs'
import { EllipsisTextPipe } from '@/pipes/ellipsis-text.pipe'

@Component({
  selector: 'app-subheader',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, EllipsisTextPipe, LetModule],
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
