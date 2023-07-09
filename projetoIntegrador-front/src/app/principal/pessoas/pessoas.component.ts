import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../model/usuario";
import {PessoasService} from "./pessoas.service";
import {Livro} from "../../model/livro";
import {Router} from "@angular/router";
import {PrincipalService} from "../principal.service";
import {PrincipalComponent} from "../principal.component";

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit{

  pessoas: Usuario[] = [];

  allPessoas: Usuario[] = [];

  constructor(private service: PessoasService, private router: Router, private principalComponent: PrincipalComponent) {
  }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listar(this.principalComponent.usuarioLogado.id).subscribe((res) => {
      this.allPessoas = res;
      this.pessoas = this.allPessoas;
    });
  }

  pesquisa(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.pessoas = this.allPessoas.filter(pessoa => {
      return pessoa.nome?.toLowerCase().includes(value.toLowerCase()) || pessoa.email?.toLowerCase().includes(value.toLowerCase());
    })
  }

  mudarParaPessoa(pessoa: Usuario) {
    this.service.pessoa = pessoa;
    this.router.navigate(['/principal/perfil']);
  }

}
