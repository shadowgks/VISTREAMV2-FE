import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticatorService } from '../services/authenticator.service';
import { authUtils } from '../utils/auth.utils';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  const _authenticatorService = inject(AuthenticatorService);
  const _router = inject(Router);

  let loggedUserData: any;
  const authUserJson = authUtils.localData();
  // Parse Object
  loggedUserData = JSON.parse(authUserJson!);
  if (authUserJson && !req.url.includes("refresh-token")) {
    // Extract the accessToken property
    const accessToken = loggedUserData.accessToken;
    // Set Authorization header with JWT token
    console.log(req.url.includes('refresh-token'));

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error.status);

      if (error.status === 401) {
        _authenticatorService.$refreshToken.next(true);
      }
      return throwError(error)
    })
  );

};
