import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRequeteurComponent } from './list-requeteur/list-requeteur.component';

import { RequeteurComponent } from './requeteur/requeteur.component';

const routes: Routes = [
  { path: '', component: ListRequeteurComponent },
  { path: 'edition/:id', component: RequeteurComponent, data: { some_data: 'some value' } },
  { path: 'edition/:id/:id1', component: RequeteurComponent, data: { some_data: 'some value' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueryBuilderRoutingModule { }
