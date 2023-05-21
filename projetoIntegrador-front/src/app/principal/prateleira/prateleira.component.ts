import {Component, OnInit} from '@angular/core';
import {Livro} from "../../model/livro";
import {PrateleiraService} from "./prateleira.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PrincipalComponent} from "../principal.component";
import {LivrosService} from "../livros/livros.service";

@Component({
  selector: 'app-prateleira',
  templateUrl: './prateleira.component.html',
  styleUrls: ['./prateleira.component.css']
})
export class PrateleiraComponent implements OnInit{
  livros: Livro[] = [];

  constructor(private service: PrateleiraService, private  router: Router, private serviceLivros: LivrosService) {}

  ngOnInit(): void {
    //this.listar();
  }

  /*listar(): void {
    this.service.listar().subscribe((dados) => {
      this.livros = dados;
    });
  }*/

  showDropbox(dropbox: HTMLDivElement, action: boolean){
    //this.dropboxShow = !this.dropboxShow;

    if (action)
      dropbox.classList.add('show')
    else
      dropbox.classList.remove('show')
  }

  mudarParaLivro(livro: Livro){
    this.serviceLivros.setlivro(livro)
    this.router.navigate(['/principal/livro']);
  }

}
