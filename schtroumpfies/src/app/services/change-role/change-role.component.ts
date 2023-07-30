import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface UserInfos {
  username: string;
  joined: string;
  role: string;
}

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.css']
})
export class ChangeRoleComponent {

  roleForm = this.fb.nonNullable.group({
    username: ['', [Validators.required,]],
    email: ['', [Validators.required,]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    ) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {

  }
}
