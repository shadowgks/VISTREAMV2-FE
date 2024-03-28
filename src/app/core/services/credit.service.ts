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

  public getCredits(searchTerm: string='', numPage: number=0, numSize: number=10): Observable<ApiResponse<Page<Credit>>>{
    return this.http.get<ApiResponse<Page<Credit>>>(`${this.apiServerUrl}?searchTerm=${searchTerm}&numPage=${numPage}&numSize=${numSize}`);
  }
  public save(formData: FormData): Observable<ApiResponse<string>>{    
    return this.http.post<ApiResponse<string>>(`${this.apiServerUrl}`, formData);
  }
  public update(id: number, formData: FormData): Observable<ApiResponse<string>>{
    return this.http.put<ApiResponse<string>>(`${this.apiServerUrl}/${id}`, formData);
  }
  search(searchTerm: string): Observable<ApiResponse<Page<Credit>>>{
    return this.http.get<ApiResponse<Page<Credit>>>(`${this.apiServerUrl}?searchTerm=${searchTerm}`);
  }
}
