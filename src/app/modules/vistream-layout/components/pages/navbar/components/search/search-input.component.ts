import { Component } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, startWith, switchMap, timer } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Media } from 'src/app/core/models/media';
import { Page } from 'src/app/core/models/pageable';
import { MediaService } from 'src/app/core/services/media.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  eventEmpty: boolean = true; 
  searchTerm!: string;
  mediaState$!: Observable<{ appState: string, appData?: ApiResponse<Page<Media[]>> }>


  constructor(
    private _router: Router,
    private _serviceMedia: MediaService){}

  onKeyUp(event: any) {
    if(event.target.value != ''){
      this.eventEmpty = false;
      this.searchTerm = event.target.value
      this.getMedia(this.searchTerm);    
    }else{
      this.eventEmpty = true;
    }    
  }

  reloadCurrentRoute(newUrl: string) {
    // Get the current URL
    const currentUrl = newUrl;

    // Navigate to the current route
    this._router.navigateByUrl('/').then(() => {
      this._router.navigate([currentUrl]);
    });
  }

  public getMedia(searchTerm?: string) {    
    this.mediaState$ = timer(1000).pipe(
      switchMap(() => this._serviceMedia.searchMedia(searchTerm)),
      map((response: ApiResponse<Page<Media[]>>) => {
        console.log(response);
        // this.currentPageSubject.next(response.result.page.number);
        return ({ appState: "app_loaded", appData: response });
      }
      ),
      startWith({ appState: "app_loading" }),
      catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error }))
    )
  }

}
