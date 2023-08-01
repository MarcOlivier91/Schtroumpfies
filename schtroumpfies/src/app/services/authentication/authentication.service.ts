import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

export const USER_STORAGE_KEY = 'APP_TOKEN';

export interface UserData {
  token: string;
  id: string;
}

@Injectable({
 providedIn: 'root'
})
export class AuthenticationService {

  public user: BehaviorSubject<UserData | null | undefined> = new BehaviorSubject<UserData | null | undefined>(undefined);

 constructor(private http: HttpClient) {
  this.loadUser();
  }

 loadUser() {
  const token = localStorage.getItem(USER_STORAGE_KEY);


  if (token) {
    const decoded: any = jwtDecode<JwtPayload>(token);
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

// if successful, return the coockie from login request
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
        id: decoded.sub,
      }
      this.user.next(userData)
      return userData;
    })
  )
 }

// remove the json web token
 signOut() {
  console.log(USER_STORAGE_KEY)
  localStorage.removeItem(USER_STORAGE_KEY);
  console.log(USER_STORAGE_KEY)
  this.user.next(null);
 }

// getting current user
 getCurrentUser() {
  return this.user.asObservable();
 }

// getting current user's id
 getCurrentUserId() {
  return this.user.getValue()?.id;
 }

//checking if user if logged in
 isLoggenIn(): Observable<boolean | UrlTree> {
  const router = inject(Router);

  return this.getCurrentUser().pipe(
    filter((user) => user !== undefined),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        return router.createUrlTree(['/login'])
      }
    })
  )
 }
}
