import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { ArrowsComponent, PinsComponent, SlideComponent} from "./carousel/carousel-components/carousel-components";
import { CarouselComponentsComponent } from './carousel/carousel-components/carousel-components.component';
import { CarouselHandlerDirective } from './carousel/directives/carousel-handler.directive';
import { CarouselService, WindowWidthService } from './carousel/services/services';
import { SharedMaterialModuleModule } from '../shared-material-module.module';

@NgModule({
  imports: [
    CommonModule,SharedMaterialModuleModule
  ],
  declarations: [CarouselComponent, ArrowsComponent, PinsComponent, SlideComponent, CarouselComponentsComponent, CarouselHandlerDirective],
  exports: [CarouselComponent],
  providers: [ CarouselService, WindowWidthService ]

})
export class CarouselModule { }
