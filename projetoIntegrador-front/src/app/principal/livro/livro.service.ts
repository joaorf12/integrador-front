import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Livro} from "../../model/livro";
import {Comentario} from "../../model/comentario";
import {PrateleiraLivro} from "../../model/prateleiraLivro";
import {Prateleira} from "../../model/prateleira";
import {ObjAvaliacao} from "../../model/objAvaliacao";

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API_BACK = "http://localhost:8080/app_readbooks/"

  constructor(private http: HttpClient) { }

  listarComentario(id_livro: number) : Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.API_BACK+"livro/comentario/"+id_livro);
  }

  listarAvaliacao(id_livro: number) : Observable<ObjAvaliacao[]> {
    return this.http.get<ObjAvaliacao[]>(this.API_BACK+"livro/avaliacao/"+id_livro);
  }

  downloadMyLivros(pdf: string) : Observable<any>{
    return this.http.get(this.API_BACK+"livro/download/"+pdf, {responseType: 'blob' as 'json'}/*, formData*/);
  }

  download(pdf: string, id_livro: number, id_pessoa: number) : Observable<any>{
    return this.http.get(this.API_BACK+"livro/download/"+pdf+"/"+id_livro+"/"+id_pessoa, {responseType: 'blob' as 'json'}/*, formData*/);
  }

  editar(livro: Livro) : Observable<Livro> {
    return this.http.post<Livro>(this.API_BACK+"livro/editar", livro);
  }

  excluir(livro: Livro) : Observable<any>{
    return this.http.post<Livro>(this.API_BACK+"livro/delete", livro);
  }

  cadComentario(comentario: Comentario) : Observable<Comentario> {
    return this.http.post<Comentario>(this.API_BACK+"livro/comentario/save", comentario);
  }

  deleteComentario(id: number | undefined) : Observable<number> {
    return this.http.get<number>(this.API_BACK+"livro/comentario/delete/"+id);
  }

  mudarLido(pl: PrateleiraLivro) : Observable<PrateleiraLivro> {
    return this.http.post<PrateleiraLivro>(this.API_BACK+"prateleira/lido", pl);
  }

  avaliar(avaliacao: ObjAvaliacao) : Observable<number> {
    return this.http.post<number>(this.API_BACK+"livro/avaliacao", avaliacao);
  }
}
