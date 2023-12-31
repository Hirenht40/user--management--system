import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import {RegisterComponent} from "./components/register/register.component"
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'register/:id', component: RegisterComponent, canActivate: [AuthGuard]},


  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
