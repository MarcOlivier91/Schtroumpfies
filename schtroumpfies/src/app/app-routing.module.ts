import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginFormComponent } from './pages/login/login-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterFormComponent } from './pages/register/register-form.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ChangeRoleComponent } from './pages/change-role/change-role.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate: [() => inject(AuthenticationService).isLoggenIn()]
  },
  {
    path: 'register',
    component: RegisterFormComponent
  },
  {
    path: 'change-role',
    component: ChangeRoleComponent,
    canActivate: [() => inject(AuthenticationService).isLoggenIn()]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
