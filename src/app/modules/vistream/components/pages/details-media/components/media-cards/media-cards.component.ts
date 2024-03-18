import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, startWith, switchMap, timer } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Media } from 'src/app/core/models/media';
import { Page } from 'src/app/core/models/pageable';
import { MediaService } from 'src/app/core/services/media.service';
import { DetailsMediaComponent } from '../../details-media.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../../../../../../vistream-layout/components/pages/loading/loading.component';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-media-cards',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './media-cards.component.html',
  styleUrl: './media-cards.component.scss'
})
export class MediaCardsComponent implements OnInit {

  mediaState$!: Observable<{ appState: string, appData?: ApiResponse<Page<Media>> }>;
  typeMedia!: string;
  @Input() typeMediaSend!: string; 


  //current page
  private currentPageSubject = new BehaviorSubject<number>(null!);
  currentPage$ = this.currentPageSubject.asObservable();
  
  constructor(private _serviceMedia: MediaService,
    private _sharedService: SharedService) { }

  ngOnInit(): void {
    this.getMedia(this.typeMediaSend);
  }


  public getMedia(typeMedia: string) {
    this.mediaState$ = timer(1000).pipe(
      switchMap(() => this._serviceMedia.getMedia(typeMedia)),
      map((response: ApiResponse<Page<Media>>) => {
        this.currentPageSubject.next(response.result.page.number);
        return ({ appState: "app_loaded", appData: response });
      }
      ),
      startWith({ appState: "app_loading" }),
      catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error }))
    )
  }

  clickNumberPagination(typeMedia: string, searchTerm: string, numPage: number = 0) {
    this.mediaState$ = this._serviceMedia.getMedia(typeMedia, searchTerm, numPage).pipe(
      map((response: ApiResponse<Page<Media>>) => {
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

  //shared picture to layout vistream
  // sendbackDropPath(backDropPath: string){
  //   this._sharedService.setData(backDropPath);  
  //   this._sharedService.triggerDataSaved();
  // }
}
