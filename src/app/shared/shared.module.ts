import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { InputFieldComponent } from './input-field/input-field.component';

@NgModule({
  declarations: [
    CampoControlErroComponent,
    FormDebugComponent,
    ErrorMsgComponent,
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CampoControlErroComponent,
    FormDebugComponent,
    ErrorMsgComponent,
    InputFieldComponent
  ]
})
export class SharedModule {}
