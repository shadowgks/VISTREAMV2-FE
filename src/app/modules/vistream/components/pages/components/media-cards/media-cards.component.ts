import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Media } from 'src/app/core/models/media';
import { Page } from 'src/app/core/models/pageable';
import { MediaService } from 'src/app/core/services/media.service';
import { DetailsMediaComponent } from '../../details-media/details-media.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-media-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './media-cards.component.html',
  styleUrl: './media-cards.component.scss'
})
export class MediaCardsComponent implements OnInit {
  mediaState$!: Observable<{ appState: string, appData?: ApiResponse<Page<Media>> }>;
  typeMedia!: string;
  constructor(private _serviceMedia: MediaService){}

  ngOnInit(): void {
    this.getMedia("movie");    
  }

  public getMedia(typeMedia: string) {
    this.mediaState$ = this._serviceMedia.getMedia(typeMedia).pipe(
      map((response: ApiResponse<Page<Media>>) => {
        // this.currentPageSubject.next(response.result.page.number);
        console.log(response);
        
        return ({ appState: "app_loaded", appData: response });
      }
      ),
      startWith({ appState: "app_loading" }),
      catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error }))
    )
  }

}
