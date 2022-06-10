import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataFormComponent } from './data-form/data-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';

const routes: Routes = [
  {path: 'tempateForm', component: TemplateFormComponent},
  {path: 'dataForm', component: DataFormComponent},
  {path: '', redirectTo: '/dataForm', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
