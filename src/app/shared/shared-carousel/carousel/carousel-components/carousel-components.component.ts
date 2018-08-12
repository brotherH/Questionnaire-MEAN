import { Component, OnInit, OnDestroy, Input, ViewChild, forwardRef } from '@angular/core';
import { ICarouselConfig } from '../services/declarations/declarations';
import { CarouselService } from '../services/carousel.service';
import { takeWhile } from 'rxjs/operators';
import { WindowWidthService } from '../services/window-width.service';
import { CarouselHandlerDirective } from '../directives/carousel-handler.directive';
import { ArrowsComponent } from './arrows/arrows.component';
import { PinsComponent } from './pins/pins.component';

@Component({
  selector: 'carousel-components',
  templateUrl: './carousel-components.component.html',
  styleUrls: ['./carousel-components.component.scss']
})
export class CarouselComponentsComponent implements OnInit, OnDestroy {

  @Input() private sources: string[];
  @Input() private config: ICarouselConfig;

  public loadedImages: string[];
  public galleryLength: number;
  public currentSlide = 0;
  public isArrowsHidden = true;


  private preventAutoplay: boolean;
  private autoplayIntervalId: number;


  @ViewChild(ArrowsComponent) private carouselArrowsComponent: ArrowsComponent;
  @ViewChild(PinsComponent) private pinsComponent: PinsComponent;
  @ViewChild(forwardRef(() => CarouselHandlerDirective)) private carouselHandlerDirective: CarouselHandlerDirective;

  constructor(private carouselService: CarouselService,
              private windowWidthService: WindowWidthService
  ) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.galleryLength = this.sources.length;
    const[showImmediate,...showWhenLoad] = this.sources;
    this.loadedImages = this.config.verifyBeforeLoad? [showImmediate] : this.sources;
    if(this.galleryLength < 2) {
      return;
    }

    this.carouselService.init( showWhenLoad, this.config );

    this.carouselService.onImageLoad()
      .pipe(
        takeWhile(() => !!this.galleryLength)
      )
      .subscribe(
        (image) => this.loadedImages.push(image)
      );

    if (this.config.autoplay) {
      this.config.autoplayDelay = this.config.autoplayDelay < 1000 ? 1000 : this.config.autoplayDelay;

      const minWidth = this.config.stopAutoplayMinWidth;

      this.windowWidthService.onResize(minWidth, true)
        .pipe(
          takeWhile(() => !!this.galleryLength)
        )
        .subscribe(
          (isMinWidth) => {
            this.preventAutoplay = !isMinWidth;
            this.onHandleAutoplay(!this.config.autoplay);
          }
        );
    }

  }

  public onChangeSlide( direction: string): void {
    if (direction === 'prev') {
      this.currentSlide = this.currentSlide === 0 ? this.loadedImages.length - 1 : --this.currentSlide;
    } else {
      this.currentSlide = this.currentSlide === this.loadedImages.length - 1 ? 0 : ++this.currentSlide;
    }

    // 用修正过的当前索引值和传入的方向animate 到下一个索引值,然后把下一个索引值设置为当前索引值
    this.carouselHandlerDirective.setNewSlide(this.currentSlide, direction);
    // 轮播的时候禁用navButton
    this.disableCarouselNavBtns();
  }


  public onChangeSlideIndex(index: number): void {

    // 如果点击的圆点对应当前图片索引,直接返回不执行下面的代码
    if (index === this.currentSlide) {
      return;
    }

    // 如果圆点的索引大于当前图片的索引值,把方向设置为 next, 否则 prev
    const direction = index > this.currentSlide ? 'next' : 'prev';

    // 把索引的 index 赋值为需要的激活图片索引
    this.currentSlide = index;

    this.carouselHandlerDirective.setNewSlide(this.currentSlide, direction);
    this.disableCarouselNavBtns();
  }

  public onHandleAutoplay(stopAutoplay: boolean): void {
    if (stopAutoplay || this.preventAutoplay) {
      clearInterval(this.autoplayIntervalId);
      // 显现控制按钮
      this.isArrowsHidden = false;
      return;
    }

    this.startAutoplay(this.config.autoplayDelay);
  }

  private startAutoplay(delay: any): void {

    this.autoplayIntervalId = setInterval(() => {
      // 默认不显示点击按钮
      this.onChangeSlide('next');
      this.disableCarouselNavBtns();
      this.isArrowsHidden = true;

    }, delay);

  }


  private disableCarouselNavBtns(): void {
    if (!this.config.animation) {
      return;
    }

    this.carouselArrowsComponent.disableNavButtons();
    this.pinsComponent.disableNavButtons();
  }

  ngOnDestroy () {
    if (this.autoplayIntervalId) {
      clearInterval(this.autoplayIntervalId);
    }
  }

}
