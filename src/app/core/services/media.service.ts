import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Media } from '../models/media';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Page } from '../models/pageable';
import { Slider } from '../models/slider';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiServerUrl = "http://localhost:8080/api/v1.0.0/media";

  constructor(private http: HttpClient) { }

  //Media  
  public getMedia(typeMedia: string, searchTerm: string='', numPage: number=0, numSize: number=30): Observable<ApiResponse<Page<Media>>>{
    return this.http.get<ApiResponse<Page<Media>>>(`${this.apiServerUrl}?typeMedia=${typeMedia}&searchTerm=${searchTerm}&numPage=${numPage}&numSize=${numSize}`);
  }

  public getDetailsMedia(shortLink: string): Observable<ApiResponse<Media>>{
    return this.http.get<ApiResponse<Media>>(`${this.apiServerUrl}/${shortLink}`);
  }

  
  //Sliders
  public getSliders(): Observable<ApiResponse<Slider>>{
    return this.http.get<ApiResponse<Slider>>(`${this.apiServerUrl}/sliders`);
  }

  public getSliderByIsEnabled(isEnabled: boolean): Observable<ApiResponse<Slider>>{
    return this.http.get<ApiResponse<Slider>>(`${this.apiServerUrl}/sliders/${isEnabled}`);
  }
}
