import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { GetUsersService } from 'src/app/services/getUsers/get-users.service';

export interface UserInfos {
  username: string;
  joined: string;
  role: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private getUserService: GetUsersService,
    ) {}

    logout() {
      this.authService.signOut();
      this.router.navigate(['/'])
    }

    ngOnInit() {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.getUserService.getUsers().subscribe(users => {
          console.log(users);
          this.users = users;
        }
      )
    }

    addFriend() {
      // TODO
    }

    changeRole() {
      this.router.navigate(['/change-role'])
    }
}
