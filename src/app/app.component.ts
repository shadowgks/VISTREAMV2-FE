import { Component, inject } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgClass, RouterOutlet, ResponsiveHelperComponent, CommonModule],
})
export class AppComponent {
confirm2($event: MouseEvent) {
throw new Error('Method not implemented.');
}
  title = 'TASKFLOW';

  constructor(public themeService: ThemeService) {
  }

}
