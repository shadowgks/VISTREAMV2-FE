import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly privateKey: string = environment.privateKey;

  public encrypt(data: any): any {
    // Convert object to string
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, this.privateKey).toString();
  }
  public decrypt(data: any): any {
    return CryptoJS.AES.decrypt(data, this.privateKey).toString(CryptoJS.enc.Utf8);
  }
}
