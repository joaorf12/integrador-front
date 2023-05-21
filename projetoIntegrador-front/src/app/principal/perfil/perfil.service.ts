import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../../model/usuario";
import {Observable} from "rxjs";
import {Livro} from "../../model/livro";

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

  listar(id: number){
    return this.http.get<Livro[]>(this.API_BACK+"livro/livros/"+id);
  }

}
