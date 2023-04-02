import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { startCase } from 'lodash'

import { IAddress } from '@/types'

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
})
export class AddressFormComponent {
  @Input() showCancelBtn = false
  @Output() onSubmit = new EventEmitter<IAddress>()
  @Output() onCancelClick = new EventEmitter<void>()
  public addressForm!: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      street: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]),
      state: this.fb.control('', [Validators.required]),
      zipCode: this.fb.control('', [Validators.required]),
    })
  }

  getControlNames() {
    return Object.keys(this.addressForm.value)
  }

  getControlLabel(camelCaseName: string) {
    return startCase(camelCaseName)
  }

  hasError(fieldName: string, errorName: string) {
    const ctrl = this.addressForm.get(fieldName)
    return ctrl?.touched && ctrl?.hasError(errorName)
  }

  handleSubmit(event: Event) {
    event.preventDefault()
    const address = this.addressForm.value as IAddress
    this.onSubmit.emit(address)
  }
}
