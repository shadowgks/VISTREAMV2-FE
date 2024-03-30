import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { authUtils } from '../utils/auth.utils';

export const accessDashboardGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  let userDetails: any = {};

  //check user if exist
  if(authUtils.getUser()){
    userDetails = authUtils.getUser();
  }

  if(userDetails && userDetails.roles[0].name.includes('SUPER_ADMIN', 'ADMIN', 'MANAGER')){
    return true;
  }else{
    return false;
  }
};
