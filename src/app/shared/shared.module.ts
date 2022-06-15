import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';

@NgModule({
  declarations: [
    CampoControlErroComponent,
    FormDebugComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CampoControlErroComponent,
    FormDebugComponent
  ]
})
export class SharedModule {}