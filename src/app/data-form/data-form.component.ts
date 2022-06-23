import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  estados$: Observable<EstadoBr>;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private consultaCepService: ConsultaCepService
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: [null, Validators.required],
			email: [null, Validators.required],
      endereco: this.fb.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
		});

    this.estados$ = this.dropdownService.getEstadoBr();
  }

  onSubmit() {
    if(this.formulario.valid){
      this.http.post('https://httpbin.org/post', this.formulario.value)
      .subscribe(dados => {
          console.log(dados['json']);
          this.resetarForm();
        },
        (error: any) => alert('Erro')
      );
    }else{
      this.validacoesForm(this.formulario);
    }
  }

  validacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAllAsTouched();
      // controle.markAsDirty();
      // if(controle instanceof FormGroup){
      //   this.validacoesForm(controle);
      // }
    });
  }

  consultaCEP(){
    this.limpaDadosForm();
    let cep = this.formulario.get('endereco.cep').value;

    if(cep != null && cep !== ''){
      this.consultaCepService.consultaCEP(cep).subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados){
    this.formulario.patchValue({
      endereco: {
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  limpaDadosForm(){
    this.formulario.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  resetarForm() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string){
    return !this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }

  aplicaCssErroInput(campo: string){
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }
}
