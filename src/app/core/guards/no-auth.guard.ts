import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { authUtils } from '../utils/auth.utils';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const localData = authUtils.localData();
  
  if(!localData){
    return true;
  }else{
    _router.navigate(['/']);
    return false;
  }
};
