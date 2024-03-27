import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { VistreamLayoutRoutingModule } from '../../../vistream-layout-routing.module';
import { GenreService } from 'src/app/core/services/genre.service';
import { CountryService } from 'src/app/core/services/country.service';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Genre } from 'src/app/core/models/genre';
import { HttpErrorResponse } from '@angular/common/http';
import { Country } from 'src/app/core/models/country';
import { SearchInputComponent } from './components/search/search-input.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [VistreamLayoutRoutingModule, CommonModule, SearchInputComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  isNotMobile = false;
  genres!: ApiResponse<Genre[]>;
  countries!: ApiResponse<Country[]>;
  

  constructor(
    private _genreService: GenreService,
    private _countryService: CountryService,
    private breakpointObserver: BreakpointObserver) {
      this.breakpointObserver.observe([
        Breakpoints.Handset,
        Breakpoints.Small
      ]).subscribe(result => {
        this.isNotMobile = result.matches;
      });
     }

    ngOnInit(){
      this.getAllCountry();
      this.getAllGenre();
    }

    getAllGenre(){
      this._genreService.getAllGenre().subscribe({
        next: (response: ApiResponse<Genre[]>) => {
          console.log(response);
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
