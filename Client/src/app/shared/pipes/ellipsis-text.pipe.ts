import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'ellipsisText',
})
export class EllipsisTextPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    if (value.length <= limit) return value
    return value.slice(0, limit - 2) + '...'
  }
}
