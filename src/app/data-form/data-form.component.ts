import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { map, tap, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { FormBaseComponent } from '../shared/form-base/form-base.component';
import { FormValidations } from '../shared/form-validations';
import { CidadeBr } from '../shared/models/cidade-br';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { VerificaEmailService } from '../shared/services/verifica-email.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent extends FormBaseComponent implements OnInit {
  // estados$: Observable<EstadoBr[]>;
  estados: EstadoBr[];
  cidades: CidadeBr[];
  cargos: any[];
  tecnologias: any[];
  newsletter: any[];
  frameworks: any[];
  minCheckbox: number = 2;

  // list = [
  //   {id:1,value:'Elenor Anderson',isSelected:false},
  //   {id:2,value:'Caden Kunze',isSelected:false},
  //   {id:3,value:'Ms. Hortense Zulauf',isSelected:false},
  //   {id:4,value:'Grady Reichert',isSelected:false},
  //   {id:5,value:'Dejon Olson',isSelected:false},
  //   {id:6,value:'Jamir Pfannerstill',isSelected:false},
  //   {id:7,value:'Aracely Renner DVM',isSelected:false},
  //   {id:8,value:'Genoveva Luettgen',isSelected:false}
  // ];

  // allSelected = false;

  // allCheckSelected(){
  //   for(let i = 0; i < this.list.length; i++) {
  //     this.list[i].isSelected = this.allSelected;
  //   }
  // }

  // isAllCheckSelected() {
  //   this.allSelected = this.list.every(item => item.isSelected === true);
  // }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private consultaCepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {
    super();
  }

  ngOnInit(): void {
    // this.estados$ = this.dropdownService.getEstadoBr();
    this.dropdownService.getEstadoBr().subscribe(estados => this.estados = estados);
    this.dropdownService.getCidadeBr().subscribe(cidades => this.cidades = cidades);
    this.dropdownService.getCidadeBrId(5).subscribe();
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletter = this.dropdownService.getNewletter();
    this.frameworks = this.dropdownService.getFrameworks();

    this.formulario = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(36)]],
			email: [null, [Validators.required, Validators.email], [this.verifcaEmail.bind(this)]],
			emailComfirma: [null, [FormValidations.equalsTo('email')]],
      endereco: this.fb.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: this.newsletter[0].valor,
      termos: [null, [Validators.pattern('true'), Validators.required]],
      frameworks: this.buildFrameworks()
		});

    // popula dados do cep no formulario
    this.formulario.get('endereco.cep').statusChanges
    .pipe(
      distinctUntilChanged(),
      // tap(value => console.log('TAP',value)),
      switchMap(status => status === 'VALID' ? this.consultaCepService.consultaCEP(this.formulario.get('endereco.cep').value) : EMPTY)
    )
    .subscribe(dados => dados ? this.populaDadosForm(dados) : {});

    this.formulario.get('endereco.estado').valueChanges
      .pipe(
        // tap(estado => console.log('Novo estado', estado)),
        map(estados => this.estados.filter(estado => estado.sigla == estados )),
        map(estado => estado && estado.length > 0 ? estado[0].id : EMPTY),
        switchMap(idEstado => this.dropdownService.getCidadeBrId(Number(idEstado)))
      )
      .subscribe(cidades => this.cidades = cidades);
  }

  buildFrameworks(){
    const values = this.frameworks.map((v) => new FormControl(false));
    return this.fb.array(values, FormValidations.requiredMinCheckbox(this.minCheckbox));

    /* return this.formBuilder.array([
      new FormControl(false), // angular
      new FormControl(false), // react
      new FormControl(false), // vue
      new FormControl(false) // sencha
    ]); */
  }

  submit() {
    // console.log(this.formulario);
    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v, i) => v ? this.frameworks[i].nome : null)
      .filter(v => v !== null)
    });

    this.http.post('https://httpbin.org/post', valueSubmit)
      .subscribe(dados => {
          console.log(dados['json']);
          this.resetarForm();
        },
        (error: any) => alert('Erro')
      );
  }

  consultaCEP(){
    this.limpaDadosForm();
    let cep = this.formulario.get('endereco.cep').value;
    if(cep && cep != null && cep !== ''){
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

  compareWith(obj1, obj2) {
    return obj1 && obj2 && obj1.desc === obj2.desc;
  }

  setarCargo(){
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pleno'};
    this.formulario.get('cargo').setValue(cargo);
  }

  setarTecnologia(){
    this.formulario.get('tecnologias').setValue(['java', 'javascript', 'ruby']);
  }

  verifcaEmail(formControl: FormControl){
    return this.verificaEmailService.getVerificaEmail(formControl.value)
      .pipe(
        map(emailExiste => emailExiste ? {emailInvalido: true} : null)
      );
  }

}
