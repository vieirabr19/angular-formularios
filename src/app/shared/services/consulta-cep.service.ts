import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConsultaCep } from '../models/consulta-cep';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(
    private http: HttpClient,
  ) { }

  consultaCEP(cep): Observable<ConsultaCep>{
    cep = cep.replace(/\D/g, ''); //cep somente com dígitos.

    if(cep != ''){
      var validacep = /^[0-9]{8}$/; //Expressão regular para validar o CEP.

      if(validacep.test(cep)){
        return this.http.get<ConsultaCep>(`https://viacep.com.br/ws/${cep}/json/`);
      }
    }

    // return of({})
  }
}
