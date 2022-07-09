import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(
    private http: HttpClient
  ) { }

  getEstadoBr(): Observable<EstadoBr[]> {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json').pipe(
      map(dados => dados),
      catchError(error => {
        console.log('ERRO NA REQUISIÇÃO:', error);
        return throwError(error);
      })
    )
  }

  getCargos(){
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pleno'},
      {nome: 'Dev', nivel: 'Sênior', desc: 'Dev Sr'}
    ];
  }

  getTecnologias(){
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'javascript', desc: 'Javascript'},
      {nome: 'php', desc: 'PHP'},
      {nome: 'ruby', desc: 'Ruby'}
    ];
  }

  getNewletter(){
    return [
      {valor: 'sim', desc: 'Sim'},
      {valor: 'nao', desc: 'Não'}
    ];
  }

  getFrameworks(){
    return [
      {nome:'angular', desc: 'Angular'},
      {nome:'react', desc: 'React'},
      {nome:'vue', desc: 'Vue'},
      {nome:'sencha', desc: 'Sencha'}
    ];
  }

}
