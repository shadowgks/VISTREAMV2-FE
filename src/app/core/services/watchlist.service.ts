import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response';
import { Media } from '../models/media';
import { Page } from '../models/pageable';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private apiServerUrl = `${environment.apiUrl}/v1.0.0/watchlist`;
  public $checkIfDataChangedInWatchList = new Subject<any>;

  constructor(private http: HttpClient) { }
  
  public getAllWatchList(numPage: number=0, numSize: number=30): Observable<ApiResponse<Page<Media[]>>>{
    return this.http.get<ApiResponse<Page<Media[]>>>(`${this.apiServerUrl}?numPage=${numPage}&numSize=${numSize}`);
  }
  public save(shortLinkMedia: string): Observable<ApiResponse<string>>{
    return this.http.post<ApiResponse<string>>(`${this.apiServerUrl}/${shortLinkMedia}`, {});
  }
  public delete(shortLinkMedia: string): Observable<ApiResponse<string>>{
    return this.http.delete<ApiResponse<string>>(`${this.apiServerUrl}/${shortLinkMedia}`);
  }
}
