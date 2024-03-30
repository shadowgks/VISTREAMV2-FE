import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, startWith, switchMap, timer } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Media } from 'src/app/core/models/media';
import { Page } from 'src/app/core/models/pageable';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-media-cards',
  templateUrl: './media-cards.component.html',
  styleUrl: './media-cards.component.scss'
})
export class MediaCardsComponent {

  typeMedia!: string;
  @Input() typeMediaSend!: string; 
  @Input() mediaState$!: Observable<{ appState: string, appData?: ApiResponse<Page<Media[]>> }>;
  @Input() nameSended!: string;
  @Input() termSearchSended!: string;


  //current page
  private currentPageSubject = new BehaviorSubject<number>(null!);
  currentPage$ = this.currentPageSubject.asObservable();
  
  constructor(
    private _serviceMedia: MediaService) { }

  ngOnInit(): void {
    this.getMedia(this.typeMediaSend);
    if(this.nameSended){
      this.getMediaByCountryOrGenre(this.nameSended);
    }
    if(this.termSearchSended){
      this.getMediaBySearch(this.termSearchSended);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {    
    if (changes['nameSended']) {      
      this.getMediaByCountryOrGenre(this.nameSended);
    }
    if(changes['termSearchSended']){
      this.getMediaBySearch(this.termSearchSended);
    }
  }


  public getMedia(typeMedia: string) {
    this.mediaState$ = timer(1000).pipe(
      switchMap(() => this._serviceMedia.getMedia(typeMedia)),
      map((response: ApiResponse<Page<Media[]>>) => {
        this.currentPageSubject.next(response.result.page.number);
        return ({ appState: "app_loaded", appData: response });
      }
      ),
      startWith({ appState: "app_loading" }),
      catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error }))
    )
  }

  //filter by country or genre
  public getMediaByCountryOrGenre(name: string) {
    this.mediaState$ = timer(1000).pipe(
      switchMap(() => this._serviceMedia.getMediaByCountryOrGenre(name)),
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

  public getMediaBySearch(searchTerm?: string) {    
    this.mediaState$ = timer(1000).pipe(
      switchMap(() => this._serviceMedia.searchMedia(searchTerm, 0, 30)),
      map((response: ApiResponse<Page<Media[]>>) => {
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
    this.clickNumberPagination(typeMedia, searchTerm , direction === 'next' ?
      this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

}
