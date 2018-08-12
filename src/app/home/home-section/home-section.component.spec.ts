import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSectionComponent } from './home-section.component';
import { NumberCountingDirective } from './directive/number-counting.directive';
import { AddCommaPipe } from './pipe/addComma.pipe';

describe('HomeSectionComponent', () => {
  let component: HomeSectionComponent;
  let fixture: ComponentFixture<HomeSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSectionComponent, NumberCountingDirective, AddCommaPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
