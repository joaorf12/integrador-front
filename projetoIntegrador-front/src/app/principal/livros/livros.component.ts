import {Component, OnInit} from '@angular/core';
import {Livro} from "../../model/livro";
import {Router} from "@angular/router";
import {LivrosService} from "./livros.service";
import {PrateleiraLivro} from "../../model/prateleiraLivro";
import {PrincipalComponent} from "../principal.component";
import {PerfilService} from "../perfil/perfil.service";
import {Usuario} from "../../model/usuario";

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit{

  livros: Livro[] = []

  allLivros: Livro[] = []

  usuario: Usuario = new Usuario();

  constructor(private  router: Router, private service: LivrosService, private principal: PrincipalComponent,
              private perfilService: PerfilService) {
  }

  ngOnInit(): void {
    this.usuario = this.principal.usuarioLogado;
    this.listar();
  }

  listar(){
    this.service.listar(this.usuario.id).subscribe((dados)=>{
      this.allLivros = dados;
      this.livros = this.allLivros.filter(livro => {
        return livro.usuario.id != this.usuario.id
      });
    })
  }

  returnInteresse(status: string){
    switch (status) {
      case "interesse":
        return "icon-marcador-cheio.png"
      case "":
        return "icon-marcador-vazio.png"
      default:
        return "icon-marcador-vazio.png"
    }
  }

  mudarInteresse(livro: Livro, marcador: HTMLDivElement){
    if(marcador){
        const prateleiraLivro: PrateleiraLivro = new PrateleiraLivro();
        prateleiraLivro.id_livro = livro.id
        prateleiraLivro.id_pessoa = this.principal.usuarioLogado.id
        this.perfilService.mudarInteresse(prateleiraLivro).subscribe((res) =>{
          if (livro.status === "interesse") {
            marcador.setAttribute('src', "assets/img/icon-marcador-vazio.png");
          } else {
            marcador.setAttribute('src', "assets/img/icon-marcador-cheio.png");
          }
        })
    }
  }

  pesquisa(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.livros = this.allLivros.filter(livro => {
      return livro.nome.toLowerCase().includes(value.toLowerCase());
    })
  }

  mudarParaLivro(livro: Livro){
    this.service.setlivro(livro)
    this.router.navigate(['/principal/livro']);
  }
}
