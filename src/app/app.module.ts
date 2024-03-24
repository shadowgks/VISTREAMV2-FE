import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modules/dashboard/components/modals/modal-actor/modal-actor.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import function to register Swiper custom elements
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import Swiper bundle with all modules installed
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AppModule { }
