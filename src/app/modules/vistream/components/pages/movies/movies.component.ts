import { Component, OnInit } from '@angular/core';
import { MediaCardsComponent } from '../../media-cards/media-cards.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Media } from 'src/app/core/models/media';
import { Page } from 'src/app/core/models/pageable';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit{
  typeMedia!: string;

  ngOnInit(): void {
    this.typeMedia = "movie";   
  }
  
  toggleFilter: boolean = false;

  btnShowFilter(){
    this.toggleFilter = !this.toggleFilter;
  }
}
