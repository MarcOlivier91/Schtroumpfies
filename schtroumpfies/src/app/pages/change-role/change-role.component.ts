import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.css']
})
export class ChangeRoleComponent {

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
