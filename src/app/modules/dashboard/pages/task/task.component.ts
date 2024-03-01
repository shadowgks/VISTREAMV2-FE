import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { ModalComponent } from '../../components/modal/modal.component';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MaterialModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  constructor(private dialog: MatDialog, private store: Store) { }

  FunctionAdd() {    
    this.OpenPopup(0, 'created task');
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
