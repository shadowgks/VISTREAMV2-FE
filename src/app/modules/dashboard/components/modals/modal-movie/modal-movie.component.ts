import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-modal-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  templateUrl: './modal-movie.component.html',
  styleUrl: './modal-movie.component.scss'
})
export class ModalMovieComponent {
  title = 'Create Movie'
  isedit = false;

  constructor(private formBuilder:FormBuilder){

  }

  ngOnInit(){
    
  }

  saveForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    name: this.formBuilder.control('', Validators.required),
    description: this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
    tags: this.formBuilder.control('', Validators.required),
    statusTask: this.formBuilder.control('InProgress', Validators.required),
    startDate: this.formBuilder.control('', Validators.required),
    endDate: this.formBuilder.control('', Validators.required),
    user: this.formBuilder.control('', Validators.required),
    assignedToUser: this.formBuilder.control(''),
  })



  saveTask(){
    if (this.saveForm.valid) {
      
    }

  }
}
