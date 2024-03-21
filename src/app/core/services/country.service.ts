import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country';
import { ApiResponse } from '../models/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiServerUrl = "http://localhost:8080/api/v1.0.0/country";

  constructor(private http: HttpClient) { }

  public getAllCountry(): Observable<ApiResponse<Country[]>>{
    return this.http.get<ApiResponse<Country[]>>(`${this.apiServerUrl}`);
  }
}
