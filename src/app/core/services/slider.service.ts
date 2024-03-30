import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Slider } from '../models/slider';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private apiServerUrl = `${environment.apiUrl}/v1.0.0/slider`;

  constructor(private http: HttpClient) { }

  public getSliders(): Observable<ApiResponse<Slider>> {
    return this.http.get<ApiResponse<Slider>>(`${this.apiServerUrl}`);
  }

  public getSliderByIsEnabled(isEnabled: boolean): Observable<ApiResponse<Slider>> {
    return this.http.get<ApiResponse<Slider>>(`${this.apiServerUrl}/${isEnabled}`);
  }
}
