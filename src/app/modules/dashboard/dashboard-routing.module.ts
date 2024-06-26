import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MoviesComponent } from './components/pages/movies/movies.component';
import { CreditsComponent } from './components/pages/credits/credits.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'credits', pathMatch: 'full' },
      { path: 'movies', component: MoviesComponent },
      { path: 'credits', component: CreditsComponent },
      { path: '**', redirectTo: 'credits' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
