import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../../../media-cards/components/card/card.component';
import { Media } from 'src/app/core/models/media';

@Component({
  selector: 'app-also-likes',
  templateUrl: './also-likes.component.html',
  styleUrl: './also-likes.component.scss'
})
export class AlsoLikesComponent {
  @Input() alsoLikes!: Media[];
}
