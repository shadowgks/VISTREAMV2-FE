import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlsoLike } from 'src/app/core/models/also-likes';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-also-likes',
  templateUrl: './also-likes.component.html',
  styleUrl: './also-likes.component.scss'
})
export class AlsoLikesComponent {
  @Input() alsoLikes!: AlsoLike[];
}
