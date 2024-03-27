import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

  constructor(
    private _formBuilder: FormBuilder,
    private _creditService: CreditService,
    private dialog: MatDialog,
    private sharedData: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {    
    //form
    this.form = this._formBuilder.group({
      credits: this._formBuilder.array([])
    });

    // Populate form fields if it's edit mode
    if (this.isEdit) {
      this.form.patchValue({
        id: this.data.id,
        fullName: this.data.fullName,
        gender: this.data.gender,
        adult: this.data.adult,
        popularity: this.data.popularity
      });
    }
  }

  //dynamic from and validations
  get f() {
    return this.form.controls;
  }

  get credits(){
    return this.form.get('credits') as FormArray;
  }

  addCredit() {
    this.credits.push(this._formBuilder.group({
      id: [],
      picture: [],
      fullName: ['', [Validators.required]],
      gender: ['2', Validators.required],
      adult: ['0', Validators.required],
      popularity: ['', Validators.required]
    }));
  }

  removeCredit(index: number) {
    this.credits.removeAt(index);
  }



  onSubmit() {
    this.submitted = true;
    const { id, fullName, picture, gender, adult, popularity} = this.form.value;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    } else {
      if (this.isEdit) {
        // Logic to update existing data
        // this.actorService.updateActor(this.data.id, this.form.value).subscribe({
        //   next: (response: ApiResponse<Actor>) => {
        //     this.sharedData.triggerDataSaved();
        //     this.dialog.closeAll();
        //     console.log(response);
        //   },
        //   error: error => {
        //     this.error = error ? error : '';
        //   }
        // });
      } else {
        this._creditService.save(this.form.value.credits).subscribe({
          next: (response: ApiResponse<Credit[]>) => {
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

