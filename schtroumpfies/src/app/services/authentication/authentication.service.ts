import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const USER_STORAGE_KEY = 'APP_TOKEN';

export interface UserData {
  token: string;
  id: string;
}

@Injectable({
 providedIn: 'root'
})
export class AuthenticationService {

  private user: BehaviorSubject<UserData | null | undefined> = new BehaviorSubject<UserData | null | undefined>(undefined);

 constructor(private http: HttpClient) {
  this.loadUser();
  }

 loadUser() {
  const token = localStorage.getItem(USER_STORAGE_KEY);


  if (token) {
    const decoded: any = jwtDecode<JwtPayload>(token);
    console.log(decoded)
    const userData: UserData = {
      token: token,
      id: decoded.sub!,
    };
    this.user.next(userData)
  } else {
    this.user.next(null)
  }
 }

 registerRequest(username: string, email: string, password: string) {
  return this.http.post('http://localhost:3000/user/signup', {
    username,
    email,
    password
  }).pipe(
    switchMap((res: any) => {
      return this.registerRequest(username, email, password);
    })
  )
 }

 loginRequest(username: string, password:string) {
  return this.http.post('http://localhost:3000/user/login/', {
    username,
    password,
  }).pipe(
    map((res: any) => {
      console.log('Result:', res);
      localStorage.setItem(USER_STORAGE_KEY, res.token);
      const decoded: any = jwtDecode<JwtPayload>(res.token);
      console.log(decoded)
      const userData: UserData = {
        token: res.token,
        id: decoded.sub!,
      }
      this.user.next(userData)
      return userData;
    })
  )
 }

 signOut() {
  localStorage.removeItem(USER_STORAGE_KEY);
  this.user.next(null);
 }

 getCurrentUser() {
  return this.user.asObservable();
 }

 getCurrentUserId() {
  return this.user.getValue()!.id;
 }
}
