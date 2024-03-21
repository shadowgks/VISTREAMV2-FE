import { Component } from '@angular/core';
import { MediaCardsComponent } from "../../media-cards/media-cards.component";

@Component({
    selector: 'app-tv-series',
    templateUrl: './tv-series.component.html',
    styleUrl: './tv-series.component.scss',
})
export class TvSeriesComponent {
  typeMedia!: string;

  ngOnInit(): void {
    this.typeMedia = "tv";   
  }
}
