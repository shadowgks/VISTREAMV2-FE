import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Actor } from 'src/app/core/models/actor';
import { ApiResponse } from 'src/app/core/models/api-response';
import { ActorService } from 'src/app/core/services/actor.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  templateUrl: './modal-actor.component.html',
  styleUrl: './modal-actor.component.scss'
})

export class ModalComponent implements OnInit {
  isEdit: boolean = this.data.code;
  title = this.isEdit == false ? 'Create Actor' : 'Edit Actor';
  form!: FormGroup;
  submitted = false;
  error = '';

  constructor(
    private _formBuilder: FormBuilder,
    private actorService: ActorService,
    private dialog: MatDialog,
    private sharedData: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {    
    //form
    this.form = this._formBuilder.group({
      id: [],
      picture: [],
      fullName: ['', [Validators.required]],
      birthDate: ['', Validators.required],
    });

    // Populate form fields if it's edit mode
    if (this.isEdit) {
      this.form.patchValue({
        id: this.data.id,
        fullName: this.data.fullName,
        birthDate: this.data.birthDate
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    console.log(this.form.invalid);

    this.submitted = true;
    const { id, fullName, picture, birthDate } = this.form.value;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    } else {
      if (this.isEdit) {
        // Logic to update existing data
        this.actorService.updateActor(this.data.id, this.form.value).subscribe({
          next: (response: ApiResponse<Actor>) => {
            this.sharedData.triggerDataSaved();
            this.dialog.closeAll();
            console.log(response);
          },
          error: error => {
            this.error = error ? error : '';
          }
        });
      } else {
        this.actorService.saveActor(this.form.value).subscribe({
          next: (response: ApiResponse<Actor>) => {
            this.sharedData.triggerDataSaved();
            this.dialog.closeAll();
            console.log(response);
          },
          error: error => {
            this.error = error ? error : '';
          }
        });
      }
    }
  }

}
