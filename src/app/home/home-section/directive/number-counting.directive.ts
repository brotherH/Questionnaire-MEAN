import { Directive, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[countTo]'
})

export class NumberCountingDirective {

  @Output() countoChange = new EventEmitter();
  @Output() countoEnd = new EventEmitter();

  private timer: any;
  private _duration: number;
  private _countTo: number;
  private _countFrom: number;
  private _step: number;

  // 每个属性set 方法内的 this.run 是为了每个属性值发生改变后立即运行

  @Input()
  set duration(duration: string) {
    this._duration = parseFloat(duration);
    this.run();
  }

  @Input()
  set countTo(countTo: string) {
    this._countTo = parseFloat(countTo);
    this.run();
  }

  @Input()
  set countFrom(countFrom: string) {
    this._countFrom = parseFloat(countFrom);
    this.run();
  }

  @Input()
  set step(step: string) {
    this._step = parseFloat(step);
    this.run();
  }

  run() {
    clearInterval(this.timer);

    if (isNaN(this._duration)) {
      return false;
    }

    if (isNaN(this._step)) {
      return false;
    }

    if (isNaN(this._countFrom)) {
      return false;
    }

    if (isNaN(this._countTo)) {
      return false;
    }

    if (this._step <= 0) {
      console.info('Step must be greater than 0.');
      return false;
    }

    if (this._duration <= 0) {
      console.info('Duration must be greater than 0.');
      return false;
    }

    if (this._step > this._duration*1000) {
      console.info('Step must be equal or smaller than duration.');
      return false;
    }

    let intermediate  = this._countFrom;
    let increment     = Math.round(Math.abs(this._countTo - this._countFrom) / ((this._duration * 1000) / this._step));

    // 单位时间里每次增长的数字 = 结束数字 - 开始数字 / 单位时间内的增长次数( 单位时间内的增长次数 = 要求的单位时间 / 增长次数)

    this.countoChange.emit(intermediate);

    this.timer = setInterval( () => {
      /*
      * 如果结束数字小于开始数字: 需要倒数
      * 如果开始数字小于结束数字 -> 把结束数字直接作为最终值并结束, 否则发送开始数字,并在每次减去增长数字后得到新的开始数字
      * 如果结束数字大于开始数字: 需要证数
      * 如果正数的时候开始数字大于结束数字 -> 把结束数字直接作为最终值并结束, 否则发送开始数字,并在每次加上增长数字后得到新的开始数字
      * */
      if (this._countTo < this._countFrom) {
        if (intermediate <= this._countTo) {
          clearInterval(this.timer);
          this.countoChange.emit(this._countTo);
          this.countoEnd.emit();
        } else {
          this.countoChange.emit(intermediate);
          intermediate -= increment;
        }
      } else {
        if (intermediate >= this._countTo) {
          clearInterval(this.timer);
          this.countoChange.emit(this._countTo);
          this.countoEnd.emit();
        } else {
          this.countoChange.emit(intermediate);
          intermediate += increment;
        }
      }
    }, this._step);
  }
}
