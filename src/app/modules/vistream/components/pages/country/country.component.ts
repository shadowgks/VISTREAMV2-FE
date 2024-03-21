import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, startWith, switchMap, timer } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Media } from 'src/app/core/models/media';
import { Page } from 'src/app/core/models/pageable';
import { MediaService } from 'src/app/core/services/media.service';
import { MediaCardsComponent } from '../../media-cards/media-cards.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent implements OnInit {
  name!: string;
  mediaState$!: Observable<{ appState: string, appData?: ApiResponse<Page<Media[]>> }>;

  constructor(
    private _routeActivate: ActivatedRoute,
    private _serviceMedia: MediaService) { }

  //current page
  private currentPageSubject = new BehaviorSubject<number>(null!);
  currentPage$ = this.currentPageSubject.asObservable();

  ngOnInit(): void {
    //take name from url
    this._routeActivate.params.subscribe(p => {
      this.name = p['name'];
      this.getMediaByCountry();
    })
  }



  public getMediaByCountry() {
    this.mediaState$ = timer(1000).pipe(
      switchMap(() => this._serviceMedia.getMediaByCountryOrGenre(this.name)),
      map((response: ApiResponse<Page<Media[]>>) => {
        this.currentPageSubject.next(response.result.page.number);
        console.log(response);
        
        return ({ appState: "app_loaded", appData: response });
      }
      ),
      startWith({ appState: "app_loading" }),
      catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error }))
    )
  }

  clickNumberPagination(typeMedia: string, searchTerm: string, numPage: number = 0) {
    this.mediaState$ = this._serviceMedia.getMedia(typeMedia, searchTerm, numPage).pipe(
      map((response: ApiResponse<Page<Media[]>>) => {
        this.currentPageSubject.next(numPage);
        return ({ appState: "app_loaded", appData: response });
      }
      ),
      startWith({ appState: "app_loading" }),
      catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error }))
    )
  }

  public clickNextOrPrevious(typeMedia: string, searchTerm: string, direction?: string) {
    this.clickNumberPagination(typeMedia, searchTerm, direction === 'next' ?
      this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }


}
