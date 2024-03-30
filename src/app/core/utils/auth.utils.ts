import { Subject } from "rxjs";
import { CreditService } from "../services/credit.service";
import { CryptoService } from "../services/crypto.service";

class AuthUtils {
  private readonly _cryptoService = new CryptoService();
  $isLogged = new Subject<boolean>;

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

  //Encrypt and Decrypt
  cryptoEncrypt(obj: any): any {
    return this._cryptoService.encrypt(obj)
  }
  cryptoDecrypt(obj: any): any {
    if(obj){
      return JSON.parse(this._cryptoService.decrypt(obj))
    }
  }

  setObjLocalStorage(accessToken: string, refreshToken: string, user?: object) {
    const object = {
      "accessToken": accessToken,
      "refreshToken": refreshToken,
      "detailsUser": this.cryptoEncrypt(user)
    }
    localStorage.setItem('authUser', JSON.stringify(object));
    this.$isLogged.next(true);
  }

  getUser() : any{
    const dataUserStringfy = authUtils.localData()!;
    if (dataUserStringfy) {
      const dataUserParse = JSON.parse(dataUserStringfy); 
      return authUtils.cryptoDecrypt(dataUserParse.detailsUser);
    }
  }
}

export const authUtils = new AuthUtils();