import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { FormDebugComponent } from './form-debug/form-debug.component';

@NgModule({
  declarations: [
    CampoControlErroComponent,
    FormDebugComponent,
    ErrorMsgComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CampoControlErroComponent,
    FormDebugComponent,
    ErrorMsgComponent
  ]
})
export class SharedModule {}
