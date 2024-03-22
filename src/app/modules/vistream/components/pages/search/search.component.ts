import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, startWith, switchMap, timer } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Media } from 'src/app/core/models/media';
import { Page } from 'src/app/core/models/pageable';
import { MediaService } from 'src/app/core/services/media.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  mediaState$!: Observable<{ appState: string, appData?: ApiResponse<Page<Media[]>> }>
  
  constructor(
    private _serviceMedia: MediaService,
    private _sharedService: SharedService) { }


    ngOnInit(){
    }



}
