import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'addComma'})
export class AddCommaPipe implements PipeTransform {
  transform (value: number): string {

    const v = value.toString();
    const len = v.length;

    // 如果长度小于等于3,没有必要进行转换,直接返回
    if(len<=3) return v;

    const remain = len%3;

    // return value.toLocaleString();
    return remain > 0 ? v.slice(0,remain) + "," + v.slice(remain,len).match(/\d{3}/g).join(",") : v.slice(remain,len).match(/\d{3}/g).join(",");
  }
}
