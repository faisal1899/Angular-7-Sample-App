import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { RegisterComponent } from './register';
import { PageNotFoundComponent } from './core/page-not-found';
import { LoginComponent } from './login';
import { AlreadyLoggedInGuard } from './core/already-logged-in-guard';
import { ProfileComponent } from './profile';
import { AuthGuard } from './core/auth-guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
    canActivate: [AlreadyLoggedInGuard]
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [AlreadyLoggedInGuard]
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
