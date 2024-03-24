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
import { HomeComponent } from './components/pages/home/home.component';
import { DetailsMediaComponent } from './components/pages/details-media/details-media.component';
import { AlsoLikesComponent } from './components/pages/details-media/components/also-likes/also-likes.component';
import { CardComponent } from './components/media-cards/components/card/card.component';
import { TvSeriesComponent } from './components/pages/tv-series/tv-series.component';
import { MediaCardsComponent } from './components/media-cards/media-cards.component';
import { MoviesComponent } from './components/pages/movies/movies.component';
import { RecommendedComponent } from './components/pages/home/components/recommended/recommended.component';
import { LatestMoviesComponent } from './components/pages/home/components/latest-movies/latest-movies.component';
import { LatestSeriesComponent } from './components/pages/home/components/latest-series/latest-series.component';
import { SliderComponent } from './components/pages/home/components/slider/slider.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountryComponent } from './components/pages/country/country.component';
import { GenreComponent } from './components/pages/genre/genre.component';
import { SearchComponent } from './components/pages/search/search.component';
import { LoadingComponent } from '../vistream-layout/components/pages/loading/loading.component';
import { FilterComponent } from './components/media-cards/components/filter/filter.component';
import { BreadCrumbComponent } from './components/pages/details-media/components/bread-crumb/bread-crumb.component';


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
    LatestSeriesComponent,
    CountryComponent,
    GenreComponent, 
    SearchComponent,
    FilterComponent,
    BreadCrumbComponent
  ],

  imports: [
    CommonModule, FormsModule,
    VistreamRoutingModule, NgxPaginationModule,
    MaterialModule, MatTabsModule, MatChipsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VistreamModule { }
