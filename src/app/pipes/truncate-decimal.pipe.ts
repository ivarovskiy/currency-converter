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

    // Округляем число до 3 цифр после запятой и преобразуем его в строку
    return value.toFixed(3);
  }
}
