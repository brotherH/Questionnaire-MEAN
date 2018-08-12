import { NgModule } from '@angular/core';
import { FooterComponent } from './footer.component';
import { SharedMaterialModuleModule } from '../shared-material-module.module';

@NgModule({
  imports: [ SharedMaterialModuleModule],
  exports: [ FooterComponent ],
  declarations: [FooterComponent]
})

export class FooterModule {

}
