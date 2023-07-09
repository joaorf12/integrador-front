import {Component, OnInit} from '@angular/core';
import {Livro} from "../../model/livro";
import {PrateleiraService} from "./prateleira.service";
import { Router} from "@angular/router";
import {PrincipalComponent} from "../principal.component";
import {LivrosService} from "../livros/livros.service";
import {Prateleira} from "../../model/prateleira";
import {LivroService} from "../livro/livro.service";
import {Usuario} from "../../model/usuario";
import {PrateleiraLivro} from "../../model/prateleiraLivro";

@Component({
  selector: 'app-prateleira',
  templateUrl: './prateleira.component.html',
  styleUrls: ['./prateleira.component.css']
})
export class PrateleiraComponent implements OnInit{
  prateleira: Prateleira = new Prateleira();

  livros: Livro[] = [];

  allLivros: Livro[] = [];

  usuario: Usuario = new Usuario();

  constructor(private service: PrateleiraService, private  router: Router, private serviceLivros: LivrosService,
              private principalComponent: PrincipalComponent, private serviceLivro: LivroService) {}

  ngOnInit(): void {
    this.listar();
    this.usuario = this.principalComponent.usuarioLogado;
  }

  listar(): void {
    this.service.listar(this.principalComponent.usuarioLogado.id).subscribe((res) => {
      this.prateleira = res;
      this.allLivros = this.prateleira.livros;
      this.livros = this.allLivros;
    });
  }

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

  pesquisa(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.livros = this.prateleira.livros.filter(livro => {
      return livro.nome?.toLowerCase().includes(value.toLowerCase()) || livro.status?.toLowerCase().includes(value.toLowerCase());
    })
  }

  baixarLivro(livro: Livro) {
    if (livro.pdf != null) {
      this.serviceLivro.download(livro.pdf, livro.id, this.usuario.id).subscribe((resp) => {
        const file = new Blob([resp],
          {
            type: resp.type
          });
        const blob = window.URL.createObjectURL(file);
        const link = document.createElement('a');

        link.href = blob;
        link.download = livro.nome + ".pdf"

        link.click();

        window.URL.revokeObjectURL(blob);
        link.remove();
      })
    }
  }

  mudarInteresse(livro: Livro){

  }

  excluir(livro: Livro) {
    let pl = new PrateleiraLivro();
    pl.id_prateleira = this.prateleira.id;
    pl.id_livro = livro.id;
    this.service.deletar(pl).subscribe(() => {
      this.listar();
    })

  }
}
