import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormatPipe',
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number | Date): string {
    if (!value) return '';

    const date = new Date(value);

    return new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  }
}
