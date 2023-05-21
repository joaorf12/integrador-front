import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../model/usuario";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CadastrarService {
  private readonly API_BACK = "http://localhost:8080/app_readbooks/usuario"

  constructor(private http: HttpClient) { }

  cadastrar(usuario: Usuario): Observable<Usuario>{
    if(usuario.id){
      return this.http.post<Usuario>(this.API_BACK+'/editar', usuario);
    }
    else{
      console.log("passo")
      return this.http.post<Usuario>(this.API_BACK+"/save", usuario);
    }
  }
}
