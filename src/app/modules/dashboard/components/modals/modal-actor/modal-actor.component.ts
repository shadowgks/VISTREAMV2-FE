import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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

export class ModalComponent implements OnInit{

  title = 'Create Actor'
  isEdit = false;
  form!: FormGroup;
  submitted = false;
  error = '';
  saved = false;

  constructor(private _formBuilder:FormBuilder, private actorService: ActorService, private dialog: MatDialog, private sharedData: SharedService){}

  ngOnInit(){
    //form
    this.form = this._formBuilder.group({
      picture: [],
      fullName: ['', [Validators.required]],
      birthDate: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {        
    console.log(this.form.invalid);
    
    this.submitted = true;
    const { fullName, picture ,birthDate } = this.form.value;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }else{
      this.actorService.saveActor(this.form.value).subscribe({
          next: (response: ApiResponse<Actor>) => {
            this.sharedData.triggerDataSaved();
            this.dialog.closeAll();
            this.saved = true;
            console.log(response);
          },
          error: error => {
            this.error = error ? error : '';
          }
        });
    }
  }

}
