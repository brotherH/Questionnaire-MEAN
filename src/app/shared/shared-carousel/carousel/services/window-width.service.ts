import { Injectable } from '@angular/core';
import { map, startWith, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class WindowWidthService {
  private minWidthBreakpoint: number;

  public onResize(minWidthBreakpoint: number, scrollBar?: boolean): Observable<boolean | {}> {
    this.minWidthBreakpoint = minWidthBreakpoint;

    return fromEvent(window, 'resize')
      .pipe(
        map(() => this.assertSize(scrollBar)),
        startWith(this.assertSize(scrollBar)),
        distinctUntilChanged()
      );
  }

  private assertSize(scrollBar?: boolean): boolean {
    const area = scrollBar ? window.innerWidth : document.documentElement.clientWidth;

    return this.minWidthBreakpoint <= area;
  }
}
