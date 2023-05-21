import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Usuario} from "../model/usuario";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  get USUARIO_LOGADO(): string {
    return this._USUARIO_LOGADO;
  }

  private readonly url = 'http://localhost:8080/app_readbooks/';
  private readonly _USUARIO_LOGADO = 'usuario-logado';

  constructor(private http: HttpClient, private  router: Router) { }

  login(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.url + 'login', usuario)
  }

  setarUsuarioLogado(usuario: Usuario): void{
    sessionStorage.setItem(this._USUARIO_LOGADO, JSON.stringify(usuario));
  }

  logout():void{
    sessionStorage.removeItem(this._USUARIO_LOGADO);
    this.router.navigate(['/login']);

  }

  usuario_logado(): Usuario{
    return JSON.parse(<string>sessionStorage.getItem(this._USUARIO_LOGADO));
  }
}
