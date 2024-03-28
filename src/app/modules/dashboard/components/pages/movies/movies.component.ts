import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MaterialModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})

export class MoviesComponent {
  constructor(private dialog: MatDialog, private store: Store) { }

  FunctionAdd() {    
    this.OpenPopup(0, 'created movie');
  }

  OpenPopup(code: number, title: string) {
    // this.store.dispatch(openpopup());
    // this.dialog.open(ModalComponent, {
    //   width: '50%',
    //   enterAnimationDuration: '200ms',
    //   exitAnimationDuration: '200ms',
    //   data: {
    //     code: code,
    //     title: title
    //   }
    // })
  }
}
