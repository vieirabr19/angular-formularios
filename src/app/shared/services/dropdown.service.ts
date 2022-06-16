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

getEstadoBr(): Observable<EstadoBr>{
  return this.http.get<EstadoBr>('assets/dados/estadosbr.json').pipe(
    map(dados => dados),
    catchError(error => {
      console.log('ERRO NA REQUISIÇÃO:',error);
      return throwError(error);
    })
  )
}

}
