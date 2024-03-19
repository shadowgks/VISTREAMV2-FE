import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Slider } from '../models/slider';


@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private apiServerUrl = "http://localhost:8080/api/v1.0.0/slider";

  constructor(private http: HttpClient) { }
  

  //Sliders
  public getSliders(): Observable<ApiResponse<Slider>> {
    return this.http.get<ApiResponse<Slider>>(`${this.apiServerUrl}`);
  }

  public getSliderByIsEnabled(isEnabled: boolean): Observable<ApiResponse<Slider>> {
    return this.http.get<ApiResponse<Slider>>(`${this.apiServerUrl}/${isEnabled}`);
  }
}
