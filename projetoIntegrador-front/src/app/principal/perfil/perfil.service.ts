import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Usuario} from "../../model/usuario";
import {Observable} from "rxjs";
import {Livro} from "../../model/livro";
import {Prateleira} from "../../model/prateleira";
import {PrateleiraLivro} from "../../model/prateleiraLivro";
import {Senha} from "../../model/senha";

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private readonly API_BACK = "http://localhost:8080/app_readbooks/"

  constructor(private http: HttpClient) { }

  cadastrarLivro(livro: Livro): Observable<Livro>{
    if(livro.id){
      return this.http.post<Livro>(this.API_BACK+'/editar', livro); //arrumar
    }
    else{
      return this.http.post<Livro>(this.API_BACK+"livro/save", livro);
    }
  }

  cadastrarCapa(formData: FormData): Observable<any>{
    return this.http.post<any>(this.API_BACK+"livro/capa", formData);
  }

  cadastrarPDF(formData: FormData): Observable<string>{
    return this.http.post<string>(this.API_BACK+"livro/pdf", formData);
  }

  listarMyLivros(id: number){
    return this.http.get<Livro[]>(this.API_BACK+"livro/livros/myLivros/"+id);
  }

  listarTheyLivros(id_pessoa: number, id_livroPessoa: number){
    return this.http.get<Livro[]>(this.API_BACK+"livro/livros/visitar/"+id_livroPessoa+"/"+id_pessoa);
  }

  mudarInteresse(prateleiraLivro: PrateleiraLivro) : Observable<Prateleira>{
    return this.http.post<Prateleira>(this.API_BACK+"prateleira/interesse", prateleiraLivro);
  }

  cadastrarFoto(formData: FormData): Observable<any>{
    return this.http.post<any>(this.API_BACK+"usuario/foto", formData);
  }

  editarPerfil(usuario: Usuario) : Observable<HttpEvent<Usuario>> {
    return this.http.post<Usuario>(this.API_BACK+"usuario/editar", usuario, {
      observe: 'events',
      reportProgress: true
    });
  }

  desativarPerfil(usuario: Usuario) : Observable<Usuario> {
    return  this.http.post<Usuario>(this.API_BACK+"usuario/desativar", usuario)
  }

  editarSenha(senha: Senha) : Observable<number> {
    return this.http.post<number>(this.API_BACK+"usuario/senha", senha)
  }

}
