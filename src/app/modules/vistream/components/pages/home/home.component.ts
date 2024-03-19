import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SliderComponent } from "../slider/slider.component";
import { MediaService } from 'src/app/core/services/media.service';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Slider } from 'src/app/core/models/slider';
import { HttpErrorResponse } from '@angular/common/http';
import { SliderService } from 'src/app/core/services/slider.service';

@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    IsEnabeld: boolean = true;
    slidersState$!: Observable<{ appState: string, appData?: ApiResponse<Slider> }>;

    constructor(
        private _mediaService: MediaService,
        private _sliderService: SliderService) { }

    ngOnInit(): void {
        this.getSliderByIsEnabled();
    }

    getSliderByIsEnabled() {
        this.slidersState$ = this._sliderService.getSliderByIsEnabled(this.IsEnabeld).pipe(
            map((response: ApiResponse<Slider>) => ({ appState: "app_loaded", appData: response })),
            startWith({ appState: "app_loading" }),
            catchError((error: HttpErrorResponse) => of({ appState: "error", error }))
        )
    }



    //scrol
    @ViewChild('scrollContainer') scrollContainer!: ElementRef;
    isAtStart: boolean = true;
    isAtEnd: boolean = false;

    scrollLeft() {
        this.scrollContainer.nativeElement.scrollLeft -= 100; // Adjust the scroll amount as needed
        this.updateScrollState();
    }

    scrollRight() {
        this.scrollContainer.nativeElement.scrollLeft += 100; // Adjust the scroll amount as needed
        this.updateScrollState();
    }

    updateScrollState() {
        const container = this.scrollContainer.nativeElement;
        this.isAtStart = container.scrollLeft === 0;
        this.isAtEnd = container.scrollLeft + container.offsetWidth >= container.scrollWidth;
    }
}
