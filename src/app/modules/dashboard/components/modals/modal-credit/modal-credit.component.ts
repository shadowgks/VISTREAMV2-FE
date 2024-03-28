import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Actor } from 'src/app/core/models/actor';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Credit } from 'src/app/core/models/credit';
import { ActorService } from 'src/app/core/services/actor.service';
import { CreditService } from 'src/app/core/services/credit.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-modal-credit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  templateUrl: './modal-credit.component.html',
  styleUrl: './modal-credit.component.scss'
})
export class ModalCreditComponent {
  isEdit: boolean = this.data.code;
  title = this.isEdit == false ? 'Create Actor' : 'Edit Actor';
  form!: FormGroup;
  submitted = false;
  error = '';
  picture: File = new File([], '')

  constructor(
    private _formBuilder: FormBuilder,
    private _creditService: CreditService,
    private dialog: MatDialog,
    private sharedData: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    //form
    this.form = this._formBuilder.group({
      id: [null],
      file: [null],
      name: ['', [Validators.required]],
      gender: ['2', Validators.required],
      adult: ['true', Validators.required],
      popularity: ['', Validators.required],
    });

    // Populate form fields if it's edit mode
    if (this.isEdit) {
      this.form.patchValue({
        id: this.data.id,
        name: this.data.name,
        gender: this.data.gender,
        adult: this.data.adult,
        popularity: this.data.popularity
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  onImageChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.picture = file;
      this.form.patchValue({
        file: this.picture
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    const { id, file, name, gender, adult, popularity } = this.form.value;
    
    //for sended form data like img
    const formData = new FormData();
    formData.append('file', this.picture);
    formData.append('name', this.form.get("name")?.value);
    formData.append('adult', this.form.get("adult")?.value);
    formData.append('gender', this.form.get("gender")?.value);
    formData.append('popularity', this.form.get("popularity")?.value);    

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    } else {
      if (this.isEdit) {
        // Logic to update existing data
        this._creditService.update(this.data.id, formData).subscribe({
          next: (response: ApiResponse<string>) => {
            this.sharedData.triggerDataSaved();
            this.dialog.closeAll();
            console.log(response);
          },
          error: error => {
            this.error = error ? error : '';
          }
        });
      } else {
        this._creditService.save(formData).subscribe({
          next: (response: ApiResponse<string>) => {
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
