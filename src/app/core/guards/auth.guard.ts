import { CanActivateFn, Router } from '@angular/router';
import { authUtils } from '../utils/auth.utils';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  let userDetails: any = {};

  //check user if exist
  if(authUtils.getUser()){
    userDetails = authUtils.getUser();
  }

  if(userDetails && userDetails.isEnabled === true){
    return true;
  }else{    
    _router.navigate(['/page']);
    return false;
  }
  
};
