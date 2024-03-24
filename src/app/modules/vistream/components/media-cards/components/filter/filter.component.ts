import { Component, OnInit } from '@angular/core';

import { GenreService } from 'src/app/core/services/genre.service';
import { CountryService } from 'src/app/core/services/country.service';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Genre } from 'src/app/core/models/genre';
import { HttpErrorResponse } from '@angular/common/http';
import { Country } from 'src/app/core/models/country';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  isNotMobile = false;

  //data
  genres!: ApiResponse<Genre[]>;
  countries!: ApiResponse<Country[]>;

  //date
  currentYear = new Date().getFullYear();
  limitLoopYear: number = 30;
  dateOlder = this.currentYear - this.limitLoopYear;

  constructor(
    private _genreService: GenreService,
    private _countryService: CountryService) {}

  ngOnInit(){
    this.getAllCountry();
    this.getAllGenre();
  }

  getAllGenre(){
    this._genreService.getAllGenre().subscribe({
      next: (response: ApiResponse<Genre[]>) => {
        this.genres = response;
      },error: (err: HttpErrorResponse) => {
        console.log(err);
        
      },
    })
  }

  getAllCountry(){
    this._countryService.getAllCountry().subscribe({
      next: (response: ApiResponse<Country[]>) => {
        this.countries = response;
      },error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    })
  }

}
