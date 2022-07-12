import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations{
  static requiredMinCheckbox(min: number = 1){
    const validator = (formArray: FormArray) => {
      /*const values = formArray.controls;
      let totalChecked = 0;
      for (let i = 0; i < values.length; i++) {
        if(values[i].value) totalChecked += 1;
      }*/

      let totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => current ? total + current : total, 0);
      return totalChecked >= min ? null : {required: true};
    };

    return validator;
  }

  static cepValidator(control: FormControl){
    const cep = control.value;
    if(cep && cep !== ''){
      var validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : {cepInvalido: true};
    }
    return null;
  }

  static equalsTo(otherField: string){
    const validator = (formControl: FormControl) => {
      //verifica se o form já foi criado
      if(!formControl.root || !(<FormGroup>formControl.root).controls) return null;

      //verfica se existe um campo
      if(otherField == null) throw new Error("É necessário informar um campo");

      //acessa o campo a ser comparado
      let field = (<FormGroup>formControl.root).get(otherField);
      //verifica se o campo passado é válido
      if(!field) throw new Error("É necessário informar um campo válido.");
      //compara se os dois campos são diferentes e se for, retorna um objeto
      if(field.value !== formControl.value) return {equalsTo: otherField}

      return null;
    }

    return validator;
  }
}
