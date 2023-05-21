import {Component, OnInit} from '@angular/core';
import {Livro} from "../../model/livro";
import {ActivatedRoute, Router} from "@angular/router";
import {LivrosService} from "../livros/livros.service";
import {Usuario} from "../../model/usuario";
import {Comentario} from "../../model/comentario";
import {Form, NgForm} from "@angular/forms";
import {LivroService} from "./livro.service";
import {PrincipalComponent} from "../principal.component";
import {ToastrService} from "ngx-toastr";
import {PerfilService} from "../perfil/perfil.service";

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit {
  livro: Livro = new Livro();

  comentarios: Comentario[] = [];
  comentario: Comentario = new Comentario();

  usuario: Usuario = new Usuario();

  capaOld: string | undefined = "";

  pdfOld: string = "";

  alteracao: boolean = false;
  editado: boolean = false;

  constructor(private route: ActivatedRoute, private serviceLivros: LivrosService,
              private service: LivroService, private principal: PrincipalComponent, private router: Router,
              private toastr: ToastrService, private servicePerfil: PerfilService) {
  }

  ngOnInit(): void {
    this.usuario = this.principal.usuarioLogado;
    this.livro = this.serviceLivros.getlivro();
    this.livro.avaliacao = 0;
    this.listar();
    this.comentario.livro = this.livro;
    this.comentario.usuario = this.usuario;
  }

  listar() {
    this.service.listar(this.livro.id).subscribe((res) => {
      this.comentarios = res;
    })
  }

  avaliar(avaliacao: number) {

  }

  addComentario(form: NgForm) {
    this.comentario.dt_hr = new Date();
    this.service.cadComentario(this.comentario).subscribe((res) =>{
      this.listar();
    })
    form.resetForm();
  }

  removeComentario(id: number | undefined) {
    this.service.deleteComentario(id).subscribe((res) =>{
      this.listar();
      this.toastr.success('Excluido com sucesso!', 'Confirmação', {
        closeButton: true,
      });
    })
  }

  baixarPDF() {
    if (this.livro.pdf != null) {
      this.service.download(this.livro.pdf).subscribe((resp) => {
        const file = new Blob([resp],
          {
            type: resp.type
          });
        const blob = window.URL.createObjectURL(file);
        const link = document.createElement('a');

        link.href = blob;
        link.download = this.livro.nome + ".pdf"

        link.click();

        window.URL.revokeObjectURL(blob);
        link.remove();
      })
    }
  }

  excluirLivro(livro: Livro) {
    this.service.excluir(livro).subscribe((res) => {
      this.router.navigate(['/principal/perfil'])
      this.toastr.success('Excluido com sucesso!', 'Confirmação', {
        closeButton: true,
      });
    }, () => {

    })
  }

  editarLivro(popup: HTMLElement) {
    this.service.editar(this.livro).subscribe((res) => {
      this.livro = res;
      this.livro.avaliacao = 0;
      this.editado = true;
      this.showPopup(popup, false)
      this.toastr.success('Editado com sucesso!', 'Confirmação', {
        closeButton: true,
      });
    })
  }

  showPopup(popup: HTMLElement, action: boolean) {
    if (action) {
      popup.style.visibility = 'visible'
      popup.style.opacity = '1'
    } else {
      if (this.alteracao && !this.editado) {
        this.livro.capa = this.livro.old_capa;
        this.livro.pdf = this.livro.old_pdf;
        this.alteracao = false;
      }
      popup.style.visibility = 'hidden'
      popup.style.opacity = '0'

      let element = document.querySelector('.capa') as HTMLLIElement
      element.style.backgroundColor = '#ad9001';
      element.textContent = 'Alterar imagem'
      element = document.querySelector('.pdf') as HTMLLIElement
      element.style.backgroundColor = '#ad9001';
      element.textContent = 'Alterar pdf'
    }
  }

  inputCapaFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const foto: File = event.target.files[0];

      const formData = new FormData();
      formData.append('capa', foto);

      this.servicePerfil.cadastrarCapa(formData).subscribe(res => {
        }
        , (error) => {
          if (!this.alteracao) {
            this.livro.old_capa = this.livro.capa;
          }
          this.livro.capa = error.error.text;
          this.alteracao = true;
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

      this.servicePerfil.cadastrarPDF(formData).subscribe((res) => {

      }, (error) => {
        if (!this.alteracao) {
          this.livro.old_pdf = this.livro.pdf;
        }
        this.livro.pdf = error.error.text;
        this.alteracao = true;
        let element = document.querySelector('.pdf') as HTMLLIElement
        element.style.backgroundColor = 'forestgreen';
        element.textContent = 'Pdf Selecionado'
      })
    }
  }

  MudaEstrela(stars: HTMLImageElement[], vazio: boolean) {
    if (vazio) {
      stars.map(function (star) {
        star.setAttribute('src', "assets/img/icon-estrela.png");
      })
    } else {
      stars.map(function (star) {
        star.setAttribute('src', 'assets/img/icon-star-vazio.png');
      })
    }
  }

}
