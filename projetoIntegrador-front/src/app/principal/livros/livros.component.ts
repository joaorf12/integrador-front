import {Component, OnInit} from '@angular/core';
import {Livro} from "../../model/livro";
import {Router} from "@angular/router";
import {LivrosService} from "./livros.service";

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit{

  livros: Livro[] = []

  constructor(private  router: Router, private service: LivrosService) {
  }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.service.listar().subscribe((dados)=>{
      this.livros = dados;
    })
  }

  returnInteresse(interesse: boolean){
    switch (interesse) {
      case true:
        return "icon-marcador-cheio.png"
      case false:
        return "icon-marcador-vazio.png"
      default:
        return "icon-marcador-vazio.png"
    }
  }

  mudarInteresse(livro: Livro, marcador: HTMLDivElement){
    if(marcador){
      if (livro.interesse) {
        livro.interesse = false;
        marcador.setAttribute('src', "assets/img/icon-marcador-vazio.png");
      } else if (!livro.interesse) {
        livro.interesse = true;
        marcador.setAttribute('src', "assets/img/icon-marcador-cheio.png");
      }
    }
  }

  mudarParaLivro(livro: Livro){
    this.service.setlivro(livro)
    this.router.navigate(['/principal/livro']);
  }
}
