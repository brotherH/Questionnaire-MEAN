import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { FooterModule } from '../shared/footer/footer.module';
import { CarouselModule } from '../shared/shared-carousel/carousel.module';
import { HomeSectionComponent } from './home-section/home-section.component';
import { AddCommaPipe } from './home-section/pipe/addComma.pipe';
import { NumberCountingDirective } from './home-section/directive/number-counting.directive';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NavbarModule, NavbarModule, FooterModule, CarouselModule],
      declarations: [ HomeComponent, HomeSectionComponent, AddCommaPipe, NumberCountingDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
