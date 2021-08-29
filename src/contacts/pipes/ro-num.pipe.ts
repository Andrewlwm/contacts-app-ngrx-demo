import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roNum',
})
export class RoNumPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    let returnValue = value.replace('/\\D/g', '').replace(' ', '').trim();
    if (returnValue.length > 0) {
      returnValue = returnValue.substring(
        returnValue.length - 10,
        returnValue.length
      );
    }
    return `${returnValue.substring(0, 4)} ${returnValue.substring(
      4,
      7
    )} ${returnValue.substring(7, 10)}`;
  }
}
