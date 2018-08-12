import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { SharedMaterialModuleModule } from '../shared-material-module.module';

@NgModule({
  imports: [ SharedMaterialModuleModule],
  exports: [NavbarComponent],
  declarations: [NavbarComponent]
})

export class NavbarModule {

}
