import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  form: any;
  error: string = "";
  registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required,]],
    email: ['', [Validators.required,]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor (
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService

  ) {}

  homepage(){
    this.router.navigate(['/']);
  }

  goToLoginPage() {
    this.router.navigate(['/login'])
  }

  onSubmit() {
    console.log('SUBMIT: ', this.registerForm.value);
    const { username, email, password } = this.registerForm.getRawValue();
    this.authService.registerRequest(username, email, password).subscribe({ // Throws a 500 while the request itself is OK (200)
      next: (res) => {
        console.log('REGISTER DONE', res)
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = "Register Failed. Please try again later.";
      }
    });
  }
}
