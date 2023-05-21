import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Livro} from "../../model/livro";
import {Comentario} from "../../model/comentario";

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API_BACK = "http://localhost:8080/app_readbooks/"

  constructor(private http: HttpClient) { }

  listar(id_livro: number) : Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.API_BACK+"livro/comentario/"+id_livro);
  }

  download(pdf: string) : Observable<any>{
    return this.http.get(this.API_BACK+"livro/download/"+pdf, {responseType: 'blob' as 'json'}/*, formData*/);
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
}
