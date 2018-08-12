import { Component, OnInit } from '@angular/core';
import { ICarouselConfig, AnimationConfig } from './services/declarations/declarations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  public imageSources: string[] = [
    'https://img.zcool.cn/community/01518258f07661a8012049ef44db35.jpg@1280w_1l_2o_100sh.jpg',
    'https://img.zcool.cn/community/01abed58f07648a8012049eff62f7e.jpg@1280w_1l_2o_100sh.jpg',
    'https://img.zcool.cn/community/01213a58f07649a8012049efac93b3.jpg@1280w_1l_2o_100sh.jpg'
  ];

  public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: true,
    animation: true,
    animationType: AnimationConfig.SLIDE,
    autoplay: true,
    autoplayDelay: 3000,
    stopAutoplayMinWidth: 768
  };

  constructor() { }

  ngOnInit() {
  }

}
