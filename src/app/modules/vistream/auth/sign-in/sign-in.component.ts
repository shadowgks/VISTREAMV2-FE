import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthenticatorService } from 'src/app/core/services/authenticator.service';
import { User } from 'src/app/core/models/user';
import { Token } from 'src/app/core/models/token';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [        
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    AngularSvgIconModule,
    NgClass,
    NgIf
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit{
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  error = '';

  constructor(private readonly _formBuilder: FormBuilder, 
    private readonly _router: Router, 
    private _serviceAuth: AuthenticatorService) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {        
    this.submitted = true;
    const { email, password } = this.form.value;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }else{
      this._serviceAuth.login(this.form.value).subscribe({
          next: (response: Token) => {
            this.setLoggedCredentials(response);
            this._router.navigate(['/']);
          },
          error: error => {
            console.log(error.error.bad_credentials);
            
            this.error = error ? error : '';
          }
        });
    }
  }

  setLoggedCredentials(token: Token) {
    localStorage.setItem('authUser', JSON.stringify(token));
  }
}
