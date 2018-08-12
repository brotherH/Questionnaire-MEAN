import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'carousel-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss']
})

export class PinsComponent {

  @Input() images: string[];
  @Input() currentSlide: number;

  @Output() changeSlide: EventEmitter<number> = new EventEmitter();

  private DISABLE_ELEMENT_TIME = 750;
  public disableElement: boolean;

  public onChangeSlide(slideIndex: number): void {
    this.changeSlide.emit(slideIndex);
  }

  public disableNavButtons(): void {
    this.disableElement = true;
    setTimeout(() => this.disableElement = false, this.DISABLE_ELEMENT_TIME);
  }
}

