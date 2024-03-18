import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AlsoLike } from 'src/app/core/models/also-likes';

@Component({
  selector: 'app-also-likes',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './also-likes.component.html',
  styleUrl: './also-likes.component.scss'
})
export class AlsoLikesComponent{
  @Input() alsoLikes!: AlsoLike[];
  constructor(private router: Router){}

  reloadCurrentRoute(newUrl:string) {
    // Get the current URL
    const currentUrl = newUrl;    
    
    // Navigate to the current route
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate([currentUrl]);
    });}
}
