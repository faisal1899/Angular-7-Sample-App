import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListUsersComponent,
    AddEditUserComponent,
    UserDetailsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class UserModule { }
