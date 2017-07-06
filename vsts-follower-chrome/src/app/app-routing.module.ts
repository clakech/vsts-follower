import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { VstsProjectsComponent } from './vsts-projects/vsts-projects.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: VstsProjectsComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
