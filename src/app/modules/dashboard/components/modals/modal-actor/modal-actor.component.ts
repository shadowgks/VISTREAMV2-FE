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

  })



  save(){
    if (this.saveForm.valid) {
      
    }

  }
}
