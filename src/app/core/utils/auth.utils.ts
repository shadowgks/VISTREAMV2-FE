class AuthUtils{
    isLoggedIn() {
        if(this.localData() == null){
          return false;
        }else{
          return true;
        }
    }
    
    logout() {
      localStorage.removeItem('authUser');
    }

    localData(){
        return localStorage.getItem('authUser');
    }
}

export const authUtils = new AuthUtils();