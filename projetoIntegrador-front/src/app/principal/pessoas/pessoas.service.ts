import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../../model/usuario";

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  private readonly API_BACK = "http://localhost:8080/app_readbooks/usuario"

  pessoa?: Usuario;

  constructor(private http: HttpClient) { }

  listar(id: number) {
    return this.http.get<Usuario[]>(this.API_BACK+"/usuarios/"+id);
  }
}
