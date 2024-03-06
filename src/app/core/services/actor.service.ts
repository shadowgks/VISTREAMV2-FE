import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response';
import { Page } from '../models/pageable';
import { Observable } from 'rxjs';
import { Actor } from '../models/actor';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private apiServerUrl = "http://localhost:8080/api/v1.0.0/actor";

  constructor(private http: HttpClient) { }

  public getActorsPageble(location: string='', numPage: number=0, size: number=8): Observable<ApiResponse<Page<Actor>>>{
    return this.http.get<ApiResponse<Page<Actor>>>(`${this.apiServerUrl}?location=${location}&numPage=${numPage}&size=${size}`);
  }

  public getActors(): Observable<ApiResponse<Page<Actor>>>{
    return this.http.get<ApiResponse<Page<Actor>>>(`${this.apiServerUrl}`);
  }

  public saveActor(competition: Actor): Observable<ApiResponse<Actor>>{
    return this.http.post<ApiResponse<Actor>>(`${this.apiServerUrl}/create`, competition);
  }
}
