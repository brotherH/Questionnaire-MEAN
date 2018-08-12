import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'carousel-arrows',
  templateUrl: './arrows.component.html',
  styleUrls: ['./arrows.component.scss']
})
export class ArrowsComponent {
  public disableElement: boolean;

  @Output() changeSlide: EventEmitter<string> = new EventEmitter();

  private DISABLE_ELEMENT_TIME = 750;

  public onChangeSlide(direction: string): void {
    this.changeSlide.emit(direction);
  }

  public disableNavButtons(): void {
    this.disableElement = true;
    setTimeout(() => this.disableElement = false, this.DISABLE_ELEMENT_TIME);
  }
}

