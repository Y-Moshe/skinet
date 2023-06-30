import { CommonModule } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Subject, debounceTime, distinctUntilChanged, Subscription } from 'rxjs'
import { InputTextModule } from 'primeng/inputtext'

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  templateUrl: './product-search.component.html',
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  @Input() isSearching = false
  @Input() searchBy = ''
  @Output() onSearchChange = new EventEmitter<string>()

  subject = new Subject<string>()
  debounceSub!: Subscription

  ngOnInit(): void {
    this.debounceSub = this.subject
      .asObservable()
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((value) => this.onSearchChange.emit(value))
  }

  handleInputChange(value: string): void {
    this.subject.next(value)
  }

  ngOnDestroy(): void {
    this.debounceSub.unsubscribe()
  }
}
