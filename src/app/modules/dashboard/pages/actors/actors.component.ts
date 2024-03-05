import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { ModalComponent } from '../../components/modals/modal-actor/modal-actor.component';

@Component({
  selector: 'app-actors',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MaterialModule],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.scss'
})

export class ActorsComponent {
  constructor(private dialog: MatDialog, private store: Store) { }

  FunctionAdd() {    
    this.OpenPopup(0, 'created actor');
  }

  OpenPopup(code: number, title: string) {
    // this.store.dispatch(openpopup());
    this.dialog.open(ModalComponent, {
      width: '50%',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      data: {
        code: code,
        title: title
      }
    })
  }
}