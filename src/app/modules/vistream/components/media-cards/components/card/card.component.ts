import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() data: any;
  
  constructor(private router: Router) { }

  reloadCurrentRoute(newUrl: string) {
    // Get the current URL
    const currentUrl = newUrl;

    // Navigate to the current route
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
