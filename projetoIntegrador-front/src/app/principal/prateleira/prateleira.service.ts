import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Prateleira} from "../../model/prateleira";
import {PrateleiraLivro} from "../../model/prateleiraLivro";

@Injectable({
  providedIn: 'root'
})
export class PrateleiraService {

  private readonly API_BACK = 'http://localhost:8080/app_readbooks/prateleira';

  constructor(private http: HttpClient) { }

  listar(id: number) : Observable<Prateleira> {
    return this.http.get<Prateleira>(this.API_BACK+"/livros/"+id)
  }

  deletar(pl: PrateleiraLivro) : Observable<number> {
    return this.http.post<number>(this.API_BACK+"/delete", pl);
  }
}
