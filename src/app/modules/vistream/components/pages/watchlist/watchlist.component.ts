import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaCardsComponent } from '../../media-cards/media-cards.component';
import { authUtils } from 'src/app/core/utils/auth.utils';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss'
})
export class WatchlistComponent {
  name!: string;
  media = authUtils.getUser();


  ngOnInit(): void {
    this.name = 'Watchlist';

    //get user
    this.media;
  }

}
