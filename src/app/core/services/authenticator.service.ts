import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Register } from '../models/register';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})

export class AuthenticatorService {
  private apiServerUrl = "http://localhost:8080/api/v1.0.0/auth";

  constructor(private http: HttpClient) { }

  login(userObj: User): Observable<Token>{
    return this.http.post<Token>(`${this.apiServerUrl}/authenticate`, userObj);
  }

  register(userObj: Register): Observable<Token>{
    return this.http.post<Token>(`${this.apiServerUrl}/register`, userObj);
  }
}
