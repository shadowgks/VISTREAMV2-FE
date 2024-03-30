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

  public $change = new Subject<boolean>;


  constructor(
    private _router: Router,
    private _genreService: GenreService,
    private _countryService: CountryService,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef //for render component
    ) {
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

    this.$change.subscribe(() => {
      this.isLogged = authUtils.isLoggedIn();
    })

  }

  ngOnChanges(changes: SimpleChanges): void{      
      if (changes['isLogged']) {    
        console.log('hey');  
      }      
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
    this.$change.next(true);    
    if(this.isLogged){
      this.dropDown = !this.dropDown;
    }else{
      this._router.navigate(['/page/auth/login'])
    }    
  }

  logout() {
    authUtils.logout();
    this.$change.next(true);
    this.dropDown = false;
    this._router.navigate(['/page/auth/login'])
  }
}
