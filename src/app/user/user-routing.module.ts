import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListUsersComponent,
  },
  {
    path: 'add',
    component: AddEditUserComponent,
  },
  {
    path: 'edit/:id',
    component: AddEditUserComponent,
  },
  {
    path: 'details/:id',
    component: UserDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
