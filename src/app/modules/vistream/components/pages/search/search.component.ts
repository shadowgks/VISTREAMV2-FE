import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, startWith, switchMap, timer } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Media } from 'src/app/core/models/media';
import { Page } from 'src/app/core/models/pageable';
import { MediaService } from 'src/app/core/services/media.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { CommonModule } from '@angular/common';
import { MediaCardsComponent } from '../../media-cards/media-cards.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchTerm!: string;
  mediaState$!: Observable<{ appState: string, appData?: ApiResponse<Page<Media[]>> }>

  constructor(
    private _activatedRouter: ActivatedRoute) { }


  ngOnInit() {
    // Navigate to the current route
    this._activatedRouter.params.subscribe(p => {
      this.searchTerm = p['term'];
    })
  }

}
