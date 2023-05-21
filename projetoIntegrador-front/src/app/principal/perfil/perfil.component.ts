import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../model/usuario";
import {Livro} from "../../model/livro";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {LivrosService} from "../livros/livros.service";
import {PerfilService} from "./perfil.service";
import {PrincipalComponent} from "../principal.component";
import {LivroService} from "../livro/livro.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = new Usuario()

  livros: Livro[] = []

  livro: Livro = new Livro();

  capa: boolean = false;

  pdf: boolean = false;

  concorda: boolean = false;

  constructor(private router: Router, private serviceLivros: LivrosService,
              private service: PerfilService, private principal: PrincipalComponent, private serviceLivro: LivroService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.usuario = this.principal.usuarioLogado;
    this.listar();
  }

  listar() {
    this.service.listar(this.usuario.id).subscribe((res) => {
      this.livros = res;
    });
  }

  showDropbox(dropbox: HTMLDivElement, action: boolean) {
    if (action)
      dropbox.classList.add('show')
    else
      dropbox.classList.remove('show')
  }

  showPopup(popup: HTMLElement, action: boolean, form: NgForm | any) {
    if (action) {
      popup.style.visibility = 'visible'
      popup.style.opacity = '1'
    } else {
      popup.style.visibility = 'hidden'
      popup.style.opacity = '0'
      form.resetForm();
    }
  }

  changeButton() {
    this.concorda = !this.concorda;
    console.log(this.concorda)
  }

  cadastrarLivro(popup: HTMLElement, form: NgForm | any) {

    if (this.concorda && this.pdf && this.capa) {
      this.livro.usuario = this.usuario;
      this.livro.num_download = 0;

      this.service.cadastrarLivro(this.livro).subscribe(() => {
        this.toastr.success('Cadastro feito!', 'Confirmação', {
          closeButton: true,
        });
        this.showPopup(popup, false, form);
        this.listar();
      })
    }
    else {
      this.toastr.warning("Existem campos não preenchidos", "Atenção!")
    }

  }

  inputCapaFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const foto: File = event.target.files[0];

      const formData = new FormData();
      formData.append('capa', foto);

      this.service.cadastrarCapa(formData).subscribe(() => {
        }
        , (error) => {
          this.livro.capa = error.error.text;
          this.capa = true;
          let element = document.querySelector('.capa') as HTMLLIElement
          element.style.backgroundColor = 'forestgreen';
          element.textContent = 'Imagem Selecionada'
        })
    }
  }

  inputPDFFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const pdf: File = event.target.files[0];

      const formData = new FormData();
      formData.append('pdf', pdf);

      this.service.cadastrarPDF(formData).subscribe(() => {
      }, (error) => {
        this.livro.pdf = error.error.text;
        this.pdf = true;
        let element = document.querySelector('.pdf') as HTMLLIElement
        element.style.backgroundColor = 'forestgreen';
        element.textContent = 'Pdf Selecionado'
      })
    }
  }

  baixarLivro(livro: Livro) {
    if (livro.pdf != null) {
      this.serviceLivro.download(livro.pdf).subscribe((resp) => {
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

  excluirLivro(livro: Livro) {
    this.serviceLivro.excluir(livro).subscribe(() => {
      this.listar();
      this.toastr.success('Excluido com sucesso!', 'Confirmação', {
        closeButton: true,
      });
    }, () => {

    })
  }

  mudarParaLivro(livro: Livro) {
    this.serviceLivros.setlivro(livro)
    this.router.navigate(['/principal/livro']);
  }
}
