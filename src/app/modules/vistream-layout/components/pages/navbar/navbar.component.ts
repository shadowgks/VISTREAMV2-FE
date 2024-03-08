import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { VistreamLayoutRoutingModule } from '../../../vistream-layout-routing.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [VistreamLayoutRoutingModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
