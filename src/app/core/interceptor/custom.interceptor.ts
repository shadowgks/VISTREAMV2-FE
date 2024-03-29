import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticatorService } from '../services/authenticator.service';
import { authUtils } from '../utils/auth.utils';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  const _authenticatorService = inject(AuthenticatorService);
  const _route = inject(Router);

  let loggedUserData: any;
  // const localData = localStorage.getItem('angular17TokenData');
  const authUserJson = authUtils.localData();
  if (authUserJson != null) {
    loggedUserData = JSON.parse(authUserJson);
    // Extract the accessToken property
    const accessToken = loggedUserData.accessToken;
    // Extract the accessToken property
    const refreshToken = loggedUserData.refreshToken;

    // Check if accessToken exists
    // Set Authorization header with JWT token
    console.log(req.url.includes('refresh-token'));
    
    if (!req.url.includes('refresh-token')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const isRefrsh = confirm("Your Session is Expred. Do you want to Continue");
        if (isRefrsh) {
          _authenticatorService.$refreshToken.next(true);
        }
      }
      return throwError(error)
    })
  );

};
