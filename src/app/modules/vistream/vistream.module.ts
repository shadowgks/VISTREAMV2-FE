import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { VistreamRoutingModule } from './vistream-routing.module';
import { VistreamComponent } from './vistream.component';
import { register } from 'swiper/element/bundle';
import { SliderComponent } from './components/pages/slider/slider.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MaterialModule } from 'src/app/material.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module




// register Swiper custom elements
register();


@NgModule({
  declarations: [VistreamComponent, SliderComponent, HomeComponent],
  imports: [
    VistreamRoutingModule, NgxPaginationModule,
    MaterialModule, MatTabsModule, MatChipsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class VistreamModule { }
