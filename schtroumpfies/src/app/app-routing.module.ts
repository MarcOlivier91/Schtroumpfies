import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginFormComponent } from './pages/login/login-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterFormComponent } from './pages/register/register-form.component';

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
    component: DashboardComponent
  },
  {
    path: 'register',
    component: RegisterFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
