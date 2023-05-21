import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PrateleiraService {

  private readonly url = 'http://localhost:8080/app_readbooks/livro';

  constructor(private http: HttpClient) { }
}
