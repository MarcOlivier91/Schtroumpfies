import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface UserInfos {
  username: string;
  joined: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('http://localhost:3000/user/')
  }
}
