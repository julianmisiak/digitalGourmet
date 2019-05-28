import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return;
    }
    if (!args) {
      return value;
    }

    args = args.toLocaleLowerCase();
    return value.filter((item) => {
      return JSON.stringify(item).toLocaleLowerCase().includes(args);
    });
  }

}
