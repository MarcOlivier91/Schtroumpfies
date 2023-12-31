import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeRoleService } from 'src/app/services/changeRole/change-role.service';

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
    role: ['', [Validators.required,]],
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private roleService: ChangeRoleService
    ) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    console.log('SUBMIT: ', this.roleForm.value);
    const { role } = this.roleForm.getRawValue();
    this.roleService.changeRoleRequest(role).subscribe({ // TODO : Fix infinite requests
      next: (res) => {
        console.log('CHANGED ROLE', res)
        this.router.navigate(['/dashboard']);
      }
    })
  }
}
