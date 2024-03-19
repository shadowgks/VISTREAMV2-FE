import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SliderComponent } from "../slider/slider.component";
import { MediaService } from 'src/app/core/services/media.service';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Slider } from 'src/app/core/models/slider';
import { HttpErrorResponse } from '@angular/common/http';
import { SliderService } from 'src/app/core/services/slider.service';
import { Media } from 'src/app/core/models/media';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    isEnabeld: boolean = true;
    typeMedia: string = 'movie';
    limitData: number = 12;
    slidersState$!: Observable<{ appState: string, appData?: ApiResponse<Slider> }>;
    mediaState$!: Observable<{ appState: string, appData?: ApiResponse<Media[]> }>;


    constructor(
        private _mediaService: MediaService,
        private _sliderService: SliderService) { }

    ngOnInit(): void {
        this.getSliderByIsEnabled();
        this.getRecommendedMedia();
    }

    getSliderByIsEnabled() {
        this.slidersState$ = this._sliderService.getSliderByIsEnabled(this.isEnabeld).pipe(
            map((response: ApiResponse<Slider>) => ({ appState: "app_loaded", appData: response })),
            startWith({ appState: "app_loading" }),
            catchError((error: HttpErrorResponse) => of({ appState: "error", error }))
        )
    }

    getRecommendedMedia() {
        this.mediaState$ = this._mediaService.getMediaRecommended(this.typeMedia, this.limitData).pipe(
            map((response: ApiResponse<Media[]>) => ({ appState: "app_loaded", appData: response })),
            startWith({ appState: "app_loading" }),
            catchError((error: HttpErrorResponse) => of({ appState: "error", error }))
        )
    }


}
