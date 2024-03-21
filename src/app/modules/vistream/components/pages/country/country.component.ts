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

  constructor(private _routeActivate: ActivatedRoute) { }

  ngOnInit(): void {
    //take name from url
    this._routeActivate.params.subscribe(p => {
      this.name = p['name'];
    })
  }

}
