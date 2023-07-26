import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
 providedIn: 'root'
})
export class AuthenticationService {

 constructor(private http: HttpClient) { }

 loginRequest(username: string, password:string) {
  return this.http.post('http://localhost:3000/user/login/', {
    username,
    password,
  }).pipe(
    map((res: any) => {
      console.log('Result:', res)
      return res;
    })
  )
 }
}
