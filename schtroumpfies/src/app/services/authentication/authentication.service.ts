import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class AuthenticationService {

 constructor() { }

 get isAuthenticated(){
   /* using the get keyword allows us to access the function as a property */
   return true;
 }
}
