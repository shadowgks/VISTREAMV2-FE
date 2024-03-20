import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-latest-series',
  templateUrl: './latest-series.component.html',
  styleUrl: './latest-series.component.scss'
})
export class LatestSeriesComponent {
  @Input() dataMedia: any;
}
