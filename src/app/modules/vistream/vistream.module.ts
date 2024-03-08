import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { VistreamRoutingModule } from './vistream-routing.module';
import { VistreamComponent } from './vistream.component';
import { register } from 'swiper/element/bundle';
import { SliderComponent } from './components/pages/slider/slider.component';
import { HomeComponent } from './components/pages/home/home.component';

// register Swiper custom elements
register();


@NgModule({
  declarations: [VistreamComponent, SliderComponent, HomeComponent],
  imports: [
    VistreamRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class VistreamModule { }
