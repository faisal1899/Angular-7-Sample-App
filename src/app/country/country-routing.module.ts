import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryAddEditComponent } from './country-add-edit/country-add-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CountryListComponent,
  },
  {
    path: 'add',
    component: CountryAddEditComponent,
  },
  {
    path: 'edit/:id',
    component: CountryAddEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
