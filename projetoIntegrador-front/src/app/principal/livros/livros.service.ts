import { Injectable } from '@angular/core';
import {Livro} from "../../model/livro";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  private readonly API_BACK = "http://localhost:8080/app_readbooks/livro"

  private livro: Livro = new Livro();

  constructor(private http: HttpClient) { }


  getlivro(): Livro {
    return this.livro;
  }

  setlivro(value: Livro) {
    this.livro = value;
  }

  listar(id: number){
    return this.http.get<Livro[]>(this.API_BACK+'/livros/'+id);
  }
}
