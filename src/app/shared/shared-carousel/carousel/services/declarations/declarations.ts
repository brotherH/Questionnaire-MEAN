export interface ICarouselConfig {
  verifyBeforeLoad: boolean;
  log: boolean;
  animation: boolean;
  animationType: AnimationConfig.SLIDE;
  autoplay: boolean;
  autoplayDelay: number;
  stopAutoplayMinWidth: number;
}

export enum AnimationConfig { APPEAR, SLIDE_OVERLAP, SLIDE }
