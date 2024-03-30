import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticatorService } from 'src/app/core/services/authenticator.service';
import { NgClass, NgIf } from '@angular/common';
import { Register } from 'src/app/core/models/register';
import { User } from 'src/app/core/models/user';
import { Token } from 'src/app/core/models/token';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { authUtils } from 'src/app/core/utils/auth.utils';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    AngularSvgIconModule,
    NgClass,
    NgIf
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  error = '';

  constructor(
    private _cryptoService: CryptoService,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private _serviceAuth: AuthenticatorService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
    const { firstName, lastName, userName, email, password } = this.form.value;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    } else {
      this._serviceAuth.register(this.form.value).subscribe({
        next: (response: Token) => {
          authUtils.setObjLocalStorage(response.accessToken, response.refreshToken);
          //get user
          this._serviceAuth.detailsUser().subscribe({
            next: (res: any) => {
              const detailsUser = res.result;
              //stored data in local storage
              authUtils.setObjLocalStorage(response.accessToken, response.refreshToken, detailsUser);
            }
          })
          //redirect
          this._router.navigate(['/']);
        },
        error: error => {
          this.error = error ? error : '';
        }
      });
    }
  }
}
