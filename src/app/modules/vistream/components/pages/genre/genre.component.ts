import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.scss'
})
export class GenreComponent {
  name!: string;

  constructor(private _routeActivate: ActivatedRoute) { }

  ngOnInit(): void {
    //take name from url
    this._routeActivate.params.subscribe(p => {
      this.name = p['name'];
    })
  }
  
  toggleFilter: boolean = false;

  btnShowFilter(){
    this.toggleFilter = !this.toggleFilter;
  }
}
