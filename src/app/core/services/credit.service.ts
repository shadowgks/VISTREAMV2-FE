import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Page } from '../models/pageable';
import { Credit } from '../models/credit';

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private apiServerUrl = "http://localhost:8080/api/v1.0.0/credit";

  constructor(private http: HttpClient) { }

  public getCredits(searchTerm: string='', numPage: number=0, size: number=8): Observable<ApiResponse<Page<Credit>>>{
    return this.http.get<ApiResponse<Page<Credit>>>(`${this.apiServerUrl}?searchTerm=${searchTerm}&numPage=${numPage}&size=${size}`);
  }
}
