import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { authUtils } from 'src/app/core/utils/auth.utils';

@Component({
    selector: 'app-profile-menu',
    templateUrl: './profile-menu.component.html',
    styleUrls: ['./profile-menu.component.scss'],
    standalone: true,
    imports: [
        ClickOutsideDirective,
        NgClass,
        RouterLink,
    ],
})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this._router.navigate(['/page/auth/login']);
    authUtils.logout();
  }
}
