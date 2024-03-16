import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';


@Component({
  selector: 'app-trailer',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './trailer.component.html',
  styleUrl: './trailer.component.scss'
})
export class TrailerComponent {
  key!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(){
    console.log(this.data.key);
    
  }

}
