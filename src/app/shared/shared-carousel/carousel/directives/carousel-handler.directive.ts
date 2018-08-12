import { Directive, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { CarouselService, ICarouselConfig } from '../services/services';

@Directive({
  selector: '[appCarouselHandler]'
})

export class CarouselHandlerDirective implements OnInit {
  @Output() public handleAutoplay: EventEmitter<boolean> = new EventEmitter();

  private config: ICarouselConfig;
  private currentSlide = 0;

  constructor(private el: ElementRef, private carouselService: CarouselService) {
  }

  ngOnInit() {
    this.config = this.carouselService.getConfig();

    if (this.config.autoplay) {
      this.autoplayHandler();
    }
  }

  public setNewSlide(newSlide: number, direction: string): void {
    const currentSlide = this.el.nativeElement.querySelector(`[data-slide="${this.currentSlide}"]`);
    const nextSlide = this.el.nativeElement.querySelector(`[data-slide="${newSlide}"]`);

    this.animate(currentSlide, nextSlide, direction);

    this.currentSlide = newSlide;
  }

  private animate(currentSlide: HTMLElement, nextSlide: HTMLElement, direction: string): void {
    if (!this.config.animation) {
      this.toggleClass('slide--hidden-initial', currentSlide, nextSlide);
      return;
    }

    const animationType = this.config.animationType;
    currentSlide.className = nextSlide.className = 'slide';
    this.toggleClass(`slide--hidden-${animationType}-${direction}`, currentSlide);
    this.toggleClass(`slide--show-${animationType}-${direction}`, nextSlide);
  }

  private toggleClass(className: string, ...elements: any[]): void {
    elements.forEach((element) => {
      element.classList.toggle(className);
    });
  }


  private autoplayHandler(): void {
    this.el.nativeElement.addEventListener('mouseenter', () => {
      this.handleAutoplay.emit(true);
    });

    this.el.nativeElement.addEventListener('mouseleave', () => {
      this.handleAutoplay.emit(false);
    });

    // 切换到别的页面时停止轮播
    document.addEventListener('visibilitychange', () => {
      this.handleAutoplay.emit(document.hidden);
    });
  }


}
