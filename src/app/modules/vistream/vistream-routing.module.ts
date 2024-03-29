import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistreamComponent } from './vistream.component';
import { TvSeriesComponent } from './components/pages/tv-series/tv-series.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MoviesComponent } from './components/pages/movies/movies.component';
import { DetailsMediaComponent } from './components/pages/details-media/details-media.component';
import { CountryComponent } from './components/pages/country/country.component';
import { GenreComponent } from './components/pages/genre/genre.component';
import { SearchComponent } from './components/pages/search/search.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: VistreamComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'movies', component: MoviesComponent, },
      { path: 'series', component: TvSeriesComponent, },
      { path: 'watch/:short_link', component: DetailsMediaComponent },
      { path: 'country/:name', component: CountryComponent, },
      { path: 'genre/:name', component: GenreComponent, },
      { path: 'search/:term', component: SearchComponent, },
      { path: 'auth/login', component: SignInComponent, },
      { path: 'auth/register', component: SignUpComponent, },
      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistreamRoutingModule { }
