class AuthUtils {
  isLoggedIn() {
    if (this.localData() == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  localData() {
    return localStorage.getItem('authUser');
  }

  setObjLocalStorage(accessToken: string, refreshToken: string, user: object){
    const object = {
      "accessToken" : accessToken,
      "refreshToken" : refreshToken,
      "detailsUser" : user
    }
    localStorage.setItem('authUser', JSON.stringify(object));
  }
}

export const authUtils = new AuthUtils();