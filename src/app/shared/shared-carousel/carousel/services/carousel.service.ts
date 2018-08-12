import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ICarouselConfig } from './declarations/declarations';


@Injectable()
export class CarouselService {
  private imageLoadedCount = 0;
  private imageLoad: Subject<string>;

  private config: ICarouselConfig;

  public init( imageSources: string[], config: ICarouselConfig  ) {
    this.imageLoadedCount = 0;
    this.imageLoad = new Subject<string>();

    config.autoplayDelay = config.autoplayDelay < 1000 ? 1000 : config.autoplayDelay;

    this.config = config;

    // 如果不需要预先加载图片,直接返回,不执行 loadImage
    if (!this.config.verifyBeforeLoad) {
      return;
    }
    this.loadImages(imageSources);
  }

  public onImageLoad() {
    return this.imageLoad;
  }

  public getConfig(): ICarouselConfig {
    return Object.assign({}, this.config);
  }

  private loadImages( imageSources: string[]): void {
    const createImageElement = (image: string): void => {
      const imgElement = document.createElement('img');
      imgElement.src = image;

      imgElement.onload = this.onImageElementLoad.bind(this, imageSources, image);

      imgElement.onerror = this.onImageElementLoadError.bind(this, imageSources, image);

    };

    imageSources.forEach(createImageElement);
  }

  private onImageElementLoad(imageSources: string[], image: string): any {
    this.imageLoadedCount++;
    this.imageLoad.next(image);

    this.carouselTinyLogger(image, true);
    this.emitIfAllImagesLoaded(imageSources);
  }

  private onImageElementLoadError(imageSources: string[], image: string): any {
    imageSources.splice(imageSources.indexOf(image), 1);
    this.carouselTinyLogger(image, false);
    this.emitIfAllImagesLoaded(imageSources);
  }

  private emitIfAllImagesLoaded(imageSources: string[]) {
    if (this.imageLoadedCount === imageSources.length) {
      this.imageLoad.complete();
      // complete 不再发送任何值
    }
  }

  private carouselTinyLogger(image: string, isLoaded: boolean): void {
    if (!this.config.log) {
      return;
    }

    if (isLoaded) {
      console.log(`Carousel module: image loaded: ${image}`);
      return;
    }

    console.error(`Carousel module: image load error: ${image}`);


  }

}
