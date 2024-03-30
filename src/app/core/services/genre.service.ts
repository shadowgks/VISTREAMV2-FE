import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response';
import { Observable } from 'rxjs';
import { Genre } from '../models/genre';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiServerUrl = `${environment.apiUrl}/v1.0.0/genre`;

  constructor(private http: HttpClient) { }

  public getAllGenre(): Observable<ApiResponse<Genre[]>>{
    return this.http.get<ApiResponse<Genre[]>>(`${this.apiServerUrl}`);
  }
}
