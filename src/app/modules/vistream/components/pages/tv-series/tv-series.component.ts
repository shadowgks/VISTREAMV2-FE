import { Component } from '@angular/core';
import { MediaCardsComponent } from "../details-media/components/media-cards/media-cards.component";

@Component({
    selector: 'app-tv-series',
    standalone: true,
    templateUrl: './tv-series.component.html',
    styleUrl: './tv-series.component.scss',
    imports: [MediaCardsComponent]
})
export class TvSeriesComponent {
  typeMedia!: string;

  ngOnInit(): void {
    this.typeMedia = "tv";   
  }
}
