import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionLoginService } from 'src/app/services/session-login/session-login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{
  username = '';
  password = '';
  wrongCredentials = false;

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required,]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  error = '';

  constructor (
    private sessionLogin: SessionLoginService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const { username, password } = this.loginForm.getRawValue();
    this.authService.loginRequest(username, password).subscribe({
      next: (res) => {
        console.log('LOGIN DONE', res)
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = "Login Failed. Please try again.";
      }
    });
  }

  homepage(){
    this.router.navigate(['/']);
  }

  goToRegisterPage() {
    this.router.navigate(['/register'])
  }
}
