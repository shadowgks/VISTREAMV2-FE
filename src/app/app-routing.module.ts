import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { customInterceptor } from './core/interceptor/custom.interceptor';
import { authGuard } from './core/guards/auth.guard';
import { accessDashboardGuard } from './core/guards/access-dashboard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/vistream-layout/vistream-layout.module').then((m) => m.VistreamLayoutModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule), canActivate: [authGuard, accessDashboardGuard]
  },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  // },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  exports: [RouterModule],
  providers: [
    provideHttpClient(withInterceptors([customInterceptor]))
  ]
})
export class AppRoutingModule {}
