import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicBuilderComponent } from './query-builder/dynamic-builder/dynamic-builder.component';
import { DynamicQueryBuilderComponent } from './query-builder/dynamic-query-builder/dynamic-query-builder.component';

const routes: Routes = [
  { path: '', redirectTo: 'dynamic-builder', pathMatch: 'full' },
  // {
  //   path: 'builder', loadChildren: () => import('./query-builder/query-builder.module').then((mod) => mod.QueryBuilderModule),
  // },
  // { path: 'dynamic-query-builder', component: DynamicQueryBuilderComponent },
  { path: 'dynamic-builder', component: DynamicBuilderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
