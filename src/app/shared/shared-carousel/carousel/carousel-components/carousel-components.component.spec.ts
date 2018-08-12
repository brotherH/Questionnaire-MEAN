import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CarouselComponentsComponent } from './carousel-components.component';
import { ArrowsComponent, PinsComponent, SlideComponent } from './carousel-components';
import { SharedMaterialModuleModule } from '../../../shared-material-module.module';
import { CarouselService, WindowWidthService} from '../services/services';

// 自定义数据测试时需要导入
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ICarouselConfig, AnimationConfig } from "../services/services";


describe('CarouselComponentsComponent', () => {
  let component: CarouselComponentsComponent;
  let fixture: ComponentFixture<CarouselComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedMaterialModuleModule],
      declarations: [ CarouselComponentsComponent, ArrowsComponent, PinsComponent, SlideComponent,  ],
      providers: [CarouselService, WindowWidthService ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponentsComponent);
    component = fixture.componentInstance;
    (component as any).sources = [
      'https://img.zcool.cn/community/01518258f07661a8012049ef44db35.jpg@1280w_1l_2o_100sh.jpg',
      'https://img.zcool.cn/community/01abed58f07648a8012049eff62f7e.jpg@1280w_1l_2o_100sh.jpg',
      'https://img.zcool.cn/community/01213a58f07649a8012049efac93b3.jpg@1280w_1l_2o_100sh.jpg'
    ];

    (component as any).config = {
      verifyBeforeLoad: false,
      log: false,
      animation: false,
      animationType: AnimationConfig.APPEAR,
      autoplay: true,
      autoplayDelay: 500
    };

    (component as any).carouselHandlerDirective = {
      setNewSlide: () => { }
    };
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe on image loading when start', inject([CarouselService], (carouselService: CarouselService) => {
    (carouselService as any).imageLoad.next('!');

    expect(component.loadedImages.pop()).toBe('!');
  }));

  describe('on init', () => {

    it('should add all imgs as loaded imgs', () => {
      expect(component.loadedImages.length).toEqual(3);
    });

    it('should init service', inject([CarouselService], (carouselService: CarouselService) => {
      const spy = spyOn(carouselService, 'init');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
    }));
  });

  describe('slide handler', () => {

    it('should set next slide if direction is "next"', () => {
      component.loadedImages = ['1', '2', '3'];

      const currentSlide = component.currentSlide;

      component.onChangeSlide('next');

      expect(component.currentSlide).toEqual(currentSlide + 1);
    });

    it('should set slide by index', () => {

      component.onChangeSlideIndex(2);

      expect(component.currentSlide).toEqual(2);
    });

    it('should set slide by index and do nothing if current slide === new slide index', () => {
      const currentSlide = component.currentSlide;

      component.onChangeSlideIndex(0);

      expect(component.currentSlide).toEqual(currentSlide);
    });

  });

  it('should have ref to carouselHandlerDirective', () => {
    expect((component as any).carouselHandlerDirective).toBeDefined();
  });

  it('should store config', () => {
    expect((component as any).config).toBeDefined();
  });

  it('config should implement interface ICarouselConfig', () => {
    expect(((component as any).config as ICarouselConfig).animation).toBeDefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

