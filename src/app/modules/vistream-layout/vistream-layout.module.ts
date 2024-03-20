import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { VistreamLayoutRoutingModule } from './vistream-layout-routing.module';
import { NavbarComponent } from './components/pages/navbar/navbar.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { VistreamLayoutComponent } from './vistream-layout.component';


@NgModule({
  declarations: [VistreamLayoutComponent],
  imports: [ 
    MatTabsModule,
    CommonModule,
    VistreamLayoutRoutingModule, 
    NavbarComponent, 
    FooterComponent
  ],
})

export class VistreamLayoutModule { }
