import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionLoginService } from 'src/app/services/session-login/session-login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{
  username = '';
  password = '';
  wrongCredentials = false;

  constructor (
    private sessionLogin: SessionLoginService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  login(){
    // call api todo
    this.wrongCredentials = false;
    this.sessionLogin.login(this.username, this.password).subscribe(result => {
      this.router.navigate(['/'])
    }, error => {
      this.wrongCredentials = true;
    })
  }


}
