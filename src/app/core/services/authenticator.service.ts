import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { Register } from '../models/register';
import { Token } from '../models/token';
import { authUtils } from '../utils/auth.utils';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})

export class AuthenticatorService {
  private apiServerUrl = "http://localhost:8080/api/v1.0.0/auth";

  public $refreshToken = new Subject<boolean>;
  public $refreshTokenReceived = new Subject<boolean>;
  
  constructor(private http: HttpClient) {
    this.$refreshToken.subscribe((res: any) => {
      this.getRefreshToken()
    })
  }

  login(userObj: User): Observable<Token> {
    return this.http.post<Token>(`${this.apiServerUrl}/authenticate`, userObj);
  }

  register(userObj: Register): Observable<Token> {
    return this.http.post<Token>(`${this.apiServerUrl}/register`, userObj);
  }

  detailsUser(): Observable<ApiResponse<User>>{
    return this.http.get<ApiResponse<User>>(`http://localhost:8080/api/v1.0.0/user/me`);
  }

  getRefreshToken() {
    let loggedUserData: any;
    const localData = authUtils.localData();

    if (localData != null) {
      loggedUserData = JSON.parse(localData);
    }
    
    const obj = {
      "refreshToken": loggedUserData.refreshToken,
    };    
    
    this.http.post(`${this.apiServerUrl}/refresh-token`, obj).subscribe((response: any) => {
      this.setLoggedCredentials(response);
      this.$refreshTokenReceived.next(true);
    })
  }

  setLoggedCredentials(token: Token) {
    localStorage.setItem('authUser', JSON.stringify(token));
  }
}
