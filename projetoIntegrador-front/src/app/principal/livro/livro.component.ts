import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {PrateleiraLivro} from "../../model/prateleiraLivro";
import {ObjAvaliacao} from "../../model/objAvaliacao";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit, AfterViewInit {
  livro: Livro = new Livro();
  livroForEdit: Livro = new Livro();

  comentarios: Comentario[] = [];
  comentario: Comentario = new Comentario();

  usuario: Usuario = new Usuario();

  capaOld: string | undefined = "";

  pdfOld: string = "";

  alteracao: boolean = false;
  editado: boolean = false;

  avaliacoes: ObjAvaliacao[] = [];

  @ViewChild('star1')
  star1!: ElementRef;
  @ViewChild('star2')
  star2!: ElementRef;
  @ViewChild('star3')
  star3!: ElementRef;
  @ViewChild('star4')
  star4!: ElementRef;
  @ViewChild('star5')
  star5!: ElementRef;

  stars: HTMLImageElement[] = [];

  constructor(private route: ActivatedRoute, private serviceLivros: LivrosService,
              private service: LivroService, private principal: PrincipalComponent, private router: Router,
              private toastr: ToastrService, private servicePerfil: PerfilService) {
  }

  ngOnInit(): void {
    this.usuario = this.principal.usuarioLogado;
    this.livro = this.serviceLivros.getlivro();
    this.livroForEdit.id = this.livro.id;
    this.livroForEdit.ano_publi = this.livro.ano_publi;
    this.livroForEdit.nome = this.livro.nome;
    this.livroForEdit.autor = this.livro.autor;
    this.livroForEdit.genero = this.livro.genero;
    this.livroForEdit.num_pag = this.livro.num_pag;
    this.livroForEdit.old_pdf = this.livro.pdf;
    this.livroForEdit.old_capa = this.livro.capa;
    this.listarComentario();
    this.listarAvaliacao();
    this.comentario.livro = this.livro;
    this.comentario.usuario = this.usuario;
  }

  ngAfterViewInit() {
    this.stars = [
      this.star1.nativeElement as HTMLImageElement,
      this.star2.nativeElement as HTMLImageElement,
      this.star3.nativeElement as HTMLImageElement,
      this.star4.nativeElement as HTMLImageElement,
      this.star5.nativeElement as HTMLImageElement
    ]
  }

  preencherEstrelas() {
    var temAvaliacao = this.avaliacoes.find((avaliacao) => avaliacao.id_usuario == this.usuario.id);
    if (temAvaliacao) {
      // @ts-ignore
      for (let i = 0; i < 5; i++) {
        // @ts-ignore
        if( i < temAvaliacao.hate) {
          this.stars[i].setAttribute('src', "assets/img/icon-estrela.png")
        }
        else {
          this.stars[i].setAttribute('src', "assets/img/icon-star-vazio.png")
        }
      }
    }
  }

  listarComentario() {
    this.service.listarComentario(this.livro.id).subscribe((res) => {
      this.comentarios = res;
    })
  }

  listarAvaliacao() {
    this.service.listarAvaliacao(this.livro.id).subscribe((res) => {
      this.avaliacoes = res;
      var totalAvaliacao = 0;
      res.map((a) => {
        if (a.hate)
          totalAvaliacao += a.hate
      });
      if (totalAvaliacao != 0) {
        this.livro.avaliacao = (totalAvaliacao / res.length).toFixed(1);
      }
      else {
        this.livro.avaliacao = "0";
      }
      this.preencherEstrelas()
    })
  }

  avaliar(avaliacao: number) {
    var objAv = new ObjAvaliacao(this.livro.id, this.usuario.id, avaliacao);
    this.service.avaliar(objAv).subscribe((res) => {
      if(res == 1) {
        this.listarAvaliacao()
        this.toastr.success('Avaliado com sucesso!', 'Confirmação', {
          closeButton: true,
        });
      }
    })
  }

  addComentario(form: NgForm) {
    this.comentario.dt_hr = new Date();
    if (this.comentario.texto) {
      this.service.cadComentario(this.comentario).subscribe((res) => {
        this.listarComentario();
      })
      form.resetForm();
    }
    else {
      this.toastr.warning("Comentário vazio.")
    }
  }

  removeComentario(id: number | undefined) {
    this.service.deleteComentario(id).subscribe((res) => {

      this.listarComentario();
      this.toastr.success('Excluido com sucesso!', 'Confirmação', {
        closeButton: true,
      });
    })
  }

  baixarPDF() {
    if (this.livro.pdf != null) {
      if ( this.livro.usuario.id == this.usuario.id ){
        this.service.downloadMyLivros(this.livro.pdf).subscribe((resp) => {
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
      else {
        this.service.download(this.livro.pdf, this.livro.id, this.usuario.id).subscribe((resp) => {
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
    this.service.editar(this.livroForEdit).subscribe((res) => {
      this.livro = res;
      this.listarAvaliacao();
      this.editado = true;
      this.showPopup(popup, false)
      this.toastr.success('Editado com sucesso!', 'Confirmação', {
        closeButton: true,
      });
      window.location.reload();
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
          // if (!this.alteracao) {
          //   this.livro.old_capa = this.livro.capa;
          // }
          this.livroForEdit.capa = error.error.text;
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
        // if (!this.alteracao) {
        //   this.livro.old_pdf = this.livro.pdf;
        // }
        this.livroForEdit.pdf = error.error.text;
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

  mudarLido(btn: HTMLButtonElement) {
    let pl = new PrateleiraLivro();
    pl.id_livro = this.livro.id;
    pl.id_pessoa = this.usuario.id;
    this.service.mudarLido(pl).subscribe(() => {
      this.toastr.success('Status mudado para lido!', 'Confirmação', {
        closeButton: true,
      });
      btn.hidden = true;
    })
  }

  btnHidden() {
    if( this.livro.status === "lido") {
      return true
    } else {
      return false
    }
  }

  returnDate(data: Date) {
    const dataFormatada = data.toString()[8]+data.toString()[9]+"/"+data.toString()[5]+data.toString()[6]+"/"+
      data.toString()[0]+data.toString()[1]+data.toString()[2]+data.toString()[3]
    return dataFormatada
  }
}
