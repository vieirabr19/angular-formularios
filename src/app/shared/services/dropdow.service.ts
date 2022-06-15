import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdowService {

  constructor(
    private http: HttpClient
  ) { }

  getEstadosBr(): Observable<EstadoBr>{
    return this.http.get<EstadoBr>('assets/dados/estadosbr.json').pipe(
      map(dados => dados),
      catchError(err => {
        console.log('ERRO NA REQUISIÇÃO =>', err);
        return throwError(err);
      }),
    )
  }

}
