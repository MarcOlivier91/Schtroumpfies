import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  constructor (
    private router: Router
  ) {}

  homepage(){
    this.router.navigate(['/']);
  }
}
