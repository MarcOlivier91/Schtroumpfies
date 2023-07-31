import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

interface UserData {
  token: string;
  userId: any;
}
export const USER_STORAGE_KEY = 'APP_TOKEN';

@Injectable({
  providedIn: 'root'
})

export class ChangeRoleService {
  AuthenticationService: any;
  public user: BehaviorSubject<UserData | null | undefined> = new BehaviorSubject<UserData | null | undefined>(undefined);


  constructor(private http: HttpClient) {
  }

  changeRoleRequest(username: string, password: string, role: string) {
  const token = localStorage.getItem(USER_STORAGE_KEY)
    if (token) {
      const decoded: any = jwtDecode<JwtPayload>(token);
      const userData: UserData = {
        token: token,
        userId: decoded.sub,
      };

    return this.http.patch(`http://localhost:3000/user/` + decoded.userId, { // TODO : Stop it from making constant request
    username,
    password,
    role,
    }).pipe(
      switchMap((res: any) => {
        return this.changeRoleRequest(username, password, role)
      })
    )
  }
  }
}
