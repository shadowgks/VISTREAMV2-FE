import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit {

  @Input() data: any;

  ngOnInit(): void {
    console.log(this.data.app_loaded);
  }

  getDurationInHoursAndMinutes(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}min`;
  }

}
