import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Media } from '../models/media';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Page } from '../models/pageable';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiServerUrl = "http://localhost:8080/api/v1.0.0/media";

  constructor(private http: HttpClient) { }

  public getMedia(typeMedia: string, searchTerm: string='', numPage: number=0, numSize: number=30): Observable<ApiResponse<Page<Media>>>{
    return this.http.get<ApiResponse<Page<Media>>>(`${this.apiServerUrl}?typeMedia=${typeMedia}&searchTerm=${searchTerm}&numPage=${numPage}&numSize=${numSize}`);
  }
}
