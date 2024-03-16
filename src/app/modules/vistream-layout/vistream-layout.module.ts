import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { VistreamLayoutRoutingModule } from './vistream-layout-routing.module';
import { register } from 'swiper/element/bundle';
import { NavbarComponent } from './components/pages/navbar/navbar.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { VistreamLayoutComponent } from './vistream-layout.component';


// register Swiper custom elements
register();

@NgModule({
  declarations: [VistreamLayoutComponent],
  imports: [ 
    MatTabsModule,
    CommonModule,
    VistreamLayoutRoutingModule, 
    NavbarComponent, 
    FooterComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class VistreamLayoutModule { }
