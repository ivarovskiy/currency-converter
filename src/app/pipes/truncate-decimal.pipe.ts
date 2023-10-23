import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateDecimal',
})
export class TruncateDecimalPipe implements PipeTransform {
  transform(value: number | string): string {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }

    if (isNaN(value)) {
      return 'Invalid Number';
    }

    return value.toFixed(3);
  }
}
