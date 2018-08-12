import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';
import { CarouselComponentsComponent } from './carousel';
import { ArrowsComponent, PinsComponent, SlideComponent } from './carousel-components/carousel-components';
import { SharedMaterialModuleModule } from '../../shared-material-module.module';
import {CarouselService, WindowWidthService} from './services/services';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedMaterialModuleModule],
      declarations: [ CarouselComponent, CarouselComponentsComponent, SlideComponent, PinsComponent, ArrowsComponent ],
      providers: [CarouselService, WindowWidthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
