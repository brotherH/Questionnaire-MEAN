import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowsComponent } from './arrows.component';
import { SharedMaterialModuleModule } from '../../../../shared-material-module.module';

describe('ArrowsComponent', () => {
  let component: ArrowsComponent;
  let fixture: ComponentFixture<ArrowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedMaterialModuleModule],
      declarations: [ ArrowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
