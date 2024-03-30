import { CanActivateFn, Router } from '@angular/router';
import { authUtils } from '../utils/auth.utils';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  //decrypt data user and set him in authUtils
  const parseObject = JSON.parse(authUtils.localData()!);
  let userDecrypt: any = {};

  //check user if exist
  if(parseObject){
    userDecrypt = authUtils.cryptoDecrypt(parseObject.detailsUser);
  }

  if(userDecrypt && userDecrypt.isEnabled === true){
    return true;
  }else{    
    _router.navigate(['/page']);
    return false;
  }
  
};
