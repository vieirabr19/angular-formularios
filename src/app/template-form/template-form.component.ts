import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ViaCep } from '../models/via-cep.model';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  usuario = {
    nome: null,
    email: null,
    endereco: {
      cep: null,
      numero: null,
      complemento: null,
      rua: null,
      bairro: null,
      cidade: null,
      estado: null
    }
  }

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form){
    this.http.post('https://httpbin.org/post', form.value).subscribe(dados => console.log(dados));
    console.log(form);
  }

  verificaValidTouched(campo){
    return !campo.valid && campo.touched;
  }

  consultaCEP(cep, formulario){
    //"cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      if(validacep.test(cep)) {
        this.resetaDadosForm(formulario);

        this.http.get(`//viacep.com.br/ws/${cep}/json`)
        .subscribe((dados: ViaCep) => this.populaDadosForm(dados, formulario));
      }
    }
  }

  populaDadosForm(dados, formulario) {
    formulario.form.patchValue({
      endereco: {
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
  }

  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

}
