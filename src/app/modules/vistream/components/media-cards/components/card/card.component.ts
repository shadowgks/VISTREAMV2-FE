import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable, Subject, catchError, map, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { WatchlistService } from 'src/app/core/services/watchlist.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() data: any;

  constructor(
    private router: Router,
    private _serviceWatchList: WatchlistService
    ) { }

  reloadCurrentRoute(newUrl: string) {
    // Get the current URL
    const currentUrl = newUrl;

    // Navigate to the current route
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  toggleWatchList(shortLinkMedia: string){
    this._serviceWatchList.save(shortLinkMedia).subscribe({
      next: (response: ApiResponse<string>) => {
        this._serviceWatchList.$checkIfDataChangedInWatchList.next(true);
        console.log(response);
        
      }, 
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    })
  }
}
