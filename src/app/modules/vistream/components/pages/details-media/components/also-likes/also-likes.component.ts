import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
}
