import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ActorsComponent } from './components/pages/actors/actors.component';
import { MoviesComponent } from './components/pages/movies/movies.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'actors', pathMatch: 'full' },
      { path: 'actors', component: ActorsComponent },
      { path: 'movies', component: MoviesComponent },
      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
