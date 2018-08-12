import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedMaterialModuleModule } from '../shared/shared-material-module.module';

import { NavbarModule } from '../shared/navbar/navbar.module';
import { FooterModule } from '../shared/footer/footer.module';
import { CarouselModule } from '../shared/shared-carousel/carousel.module';

import { NumberCountingDirective } from './home-section/directive/number-counting.directive';
import { AddCommaPipe } from './home-section/pipe/addComma.pipe';

import { HomeSectionComponent } from './home-section/home-section.component';
import { HomeComponent } from './home.component';



@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarModule,
    FooterModule,
    SharedMaterialModuleModule,
    CarouselModule,
  ],
  exports: [HomeComponent],
  declarations: [HomeComponent, HomeSectionComponent, NumberCountingDirective, AddCommaPipe],
  providers: []
})
export class HomeModule { }
