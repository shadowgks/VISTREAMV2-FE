import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VistreamLayoutComponent } from './vistream-layout.component';


const routes: Routes = [
  {
    path: 'page',
    component: VistreamLayoutComponent,
    loadChildren: () => import('../vistream/vistream.module').then((m) => m.VistreamModule)
  },
  { path: '', redirectTo: 'page', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistreamLayoutRoutingModule { }
