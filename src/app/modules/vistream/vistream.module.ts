import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { VistreamRoutingModule } from './vistream-routing.module';
import { VistreamComponent } from './vistream.component';
import { register } from 'swiper/element/bundle';
import { MaterialModule } from 'src/app/material.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from './components/pages/slider/slider.component';
import { HomeComponent } from './components/pages/home/home.component';
import { DetailsMediaComponent } from './components/pages/details-media/details-media.component';
import { AlsoLikesComponent } from './components/pages/details-media/components/also-likes/also-likes.component';
import { CardComponent } from './components/pages/details-media/components/card/card.component';
import { TvSeriesComponent } from './components/pages/tv-series/tv-series.component';
import { MediaCardsComponent } from './components/pages/details-media/components/media-cards/media-cards.component';
import { MoviesComponent } from './components/pages/movies/movies.component';
import { LoadingComponent } from '../vistream-layout/components/pages/loading/loading.component';
import { RecommendedComponent } from './components/pages/home/components/recommended/recommended.component';
import { LatestMoviesComponent } from './components/pages/home/components/latest-movies/latest-movies.component';
import { LatestSeriesComponent } from './components/pages/home/components/latest-series/latest-series.component';


// register Swiper custom elements
register();


@NgModule({
  declarations: [
    VistreamComponent, 
    SliderComponent, 
    HomeComponent, 
    CardComponent,
    MediaCardsComponent,
    MoviesComponent,
    TvSeriesComponent,
    AlsoLikesComponent,
    DetailsMediaComponent,
    LoadingComponent,
    RecommendedComponent,
    LatestMoviesComponent,
    LatestSeriesComponent
  ],

  imports: [
    CommonModule, FormsModule,
    VistreamRoutingModule, NgxPaginationModule,
    MaterialModule, MatTabsModule, MatChipsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class VistreamModule { }
