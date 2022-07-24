import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-base',
  template: '<div></div>'
})
export abstract class FormBaseComponent implements OnInit {

  formulario: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit();

  onSubmit(){
    if(this.formulario.valid){
      this.submit();
    }else{
      this.validacoesForm(this.formulario);
    }
  }

  validacoesForm(formGroup: FormGroup | FormArray){
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAllAsTouched();
      // controle.markAsDirty();
      // if(controle instanceof FormGroup | controle instanceof FormArray){
      //   this.validacoesForm(controle);
      // }
    });
  }

  resetarForm() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string){
    return !this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }

  verificaRequired(campo: string){
    return this.formulario.get(campo).hasError('required') && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email');
    if (campoEmail.errors) return campoEmail.errors['email'] && campoEmail.touched;
  }

  aplicaCssErroInput(campo: string){
    return {
      'is-invalid': this.verificaValidTouched(campo) || this.verificaRequired(campo)
    }
  }

  getCampo(campo: string){
    return this.formulario.get(campo);
  }

}
