import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.scss'
})
export class RecommendedComponent {
  @Input() dataMedia: any;
}
