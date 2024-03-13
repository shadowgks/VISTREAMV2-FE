import { Component } from '@angular/core';
import { MediaCardsComponent } from '../components/media-cards/media-cards.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MediaCardsComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {

}
