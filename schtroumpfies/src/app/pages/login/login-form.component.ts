import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionLoginService } from 'src/app/services/session-login/session-login.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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

  form = this.fb.nonNullable.group({
    username: ['', [Validators.required,]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  constructor (
    private sessionLogin: SessionLoginService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('SUBMIT: ', this.form.value);
    const { username, password } = this.form.getRawValue();
    this.authService.loginRequest(username, password).subscribe(result => {
      console.log(result)
    });
  }

  homepage(){
    this.router.navigate(['/']);
  }

  login(){
    // call api todo
    /*
    this.wrongCredentials = false;
    this.sessionLogin.login(this.username, this.password).subscribe(result => {
      console.log(result);
      this.router.navigate(['/dashboard'])
    }, error => {
      this.wrongCredentials = true;
    }) */
    console.log('SUBMIT: ', this.form.value);
    const { username, password } = this.form.getRawValue();
    this.authService.loginRequest(username, password).subscribe();
  }

  goToRegisterPage() {
    this.router.navigate(['/register'])
  }
}
