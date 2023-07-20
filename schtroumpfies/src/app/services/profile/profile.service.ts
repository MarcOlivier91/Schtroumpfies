import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements CanActivate{

  profile = null;
  constructor(
    private httpClient: HttpClient
  ) { }


  getProfile() {
    return new Observable((observer) => {
      if (this.profile) {
        observer.next(this.profile);
        observer.complete()
      } else {
        this.httpClient.get
      }
    });
  }
}
