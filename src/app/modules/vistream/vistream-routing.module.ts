import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistreamComponent } from './vistream.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MoviesComponent } from './components/pages/movies/movies.component';
import { TvSeriesComponent } from './components/pages/tv-series/tv-series.component';
import { DetailsMediaComponent } from './components/pages/details-media/details-media.component';

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
      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistreamRoutingModule { }
