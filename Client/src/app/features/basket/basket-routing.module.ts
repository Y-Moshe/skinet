import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BasketComponent } from './basket.component'

const routes: Routes = [
  {
    path: '',
    component: BasketComponent,
    pathMatch: 'full',
    title: 'Shopping Cart',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasketRoutingModule {}
