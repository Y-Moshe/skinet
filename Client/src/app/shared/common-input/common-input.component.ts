import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-common-input',
  templateUrl: './common-input.component.html',
})
export class CommonInputComponent {
  @Input() name!: string
  @Input() label!: string
  @Input() type!: string
  @Input() form!: FormGroup
}
