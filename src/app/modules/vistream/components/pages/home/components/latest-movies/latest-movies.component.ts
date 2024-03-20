import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-latest-movies',
  templateUrl: './latest-movies.component.html',
  styleUrl: './latest-movies.component.scss'
})
export class LatestMoviesComponent {
  @Input() dataMedia: any;
}
