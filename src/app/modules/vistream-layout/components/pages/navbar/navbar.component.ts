import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { VistreamLayoutRoutingModule } from '../../../vistream-layout-routing.module';
import { GenreService } from 'src/app/core/services/genre.service';
import { CountryService } from 'src/app/core/services/country.service';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Genre } from 'src/app/core/models/genre';
import { HttpErrorResponse } from '@angular/common/http';
import { Country } from 'src/app/core/models/country';
import { SearchInputComponent } from './components/search/search-input.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { authUtils } from 'src/app/core/utils/auth.utils';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [VistreamLayoutRoutingModule, CommonModule, SearchInputComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isNotMobile = false;
  genres!: ApiResponse<Genre[]>;
  countries!: ApiResponse<Country[]>;
  dropDown: boolean = false;
  isLogged: boolean = authUtils.isLoggedIn();

  //store data user
  readonly detailsUser = authUtils.getUser();


  constructor(
    private _router: Router,
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

  ngOnInit() {
    this.getAllCountry();
    this.getAllGenre();

    //get user
    authUtils.getUser();

    //when user logged
    authUtils.$isLogged.subscribe(()=>{
      this.isLogged = authUtils.isLoggedIn();

      //get user if logged again
      authUtils.getUser();
    })    
  }

  getAllGenre() {
    this._genreService.getAllGenre().subscribe({
      next: (response: ApiResponse<Genre[]>) => {
        this.genres = response;
      }, 
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    })
  }

  getAllCountry() {
    this._countryService.getAllCountry().subscribe({
      next: (response: ApiResponse<Country[]>) => {
        this.countries = response;
      }, 
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    })
  }

  showDropDown() {
    if(this.isLogged){
      this.dropDown = !this.dropDown;
    }else{
      this._router.navigate(['/page/auth/login'])
    }    
  }

  logout() {
    authUtils.logout();
    this.dropDown = false;
    this.isLogged = false;
    this._router.navigate(['/page/auth/login'])
  }
}
