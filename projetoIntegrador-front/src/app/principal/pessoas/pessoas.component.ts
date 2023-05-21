import { Component } from '@angular/core';
import {Usuario} from "../../model/usuario";

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent {

  //pessoas: Usuario[] = [];

  pessoas = [
    {
      nome: 'Joao'
    },{
      nome: 'José'
    },{
      nome: 'Maria'
    },{
      nome: 'Robson'
    },{
      nome: 'Moises'
    }
  ]

}
