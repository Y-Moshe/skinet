import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
  tap,
} from 'rxjs'

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  @Input() isSearching = false
  @Output() onSearchChange = new EventEmitter<string>()

  searchInput = ''
  subject = new BehaviorSubject<string>('')
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
