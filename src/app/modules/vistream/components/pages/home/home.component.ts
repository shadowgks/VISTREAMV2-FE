import { Component, OnInit } from '@angular/core';
import { SliderComponent } from "../slider/slider.component";
import { MediaService } from 'src/app/core/services/media.service';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Slider } from 'src/app/core/models/slider';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
    IsEnabeld: boolean = true;
    slidersState$!: Observable<{ appState: string, appData?: ApiResponse<Slider> }>;

    constructor(private _mediaService: MediaService){}

    ngOnInit(): void {
        this.getSliderByIsEnabled();
    }

    getSliderByIsEnabled(){
        this.slidersState$ = this._mediaService.getSliderByIsEnabled(this.IsEnabeld).pipe(
            map((response: ApiResponse<Slider>) => ({appState: "app_loaded", appData: response})),
            startWith({appState: "app_loading"}),
            catchError((error: HttpErrorResponse) => of({appState: "error", error}))
        )
    }



}
