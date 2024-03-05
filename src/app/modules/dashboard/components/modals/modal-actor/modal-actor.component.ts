import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
