import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../model/usuario";
import {Livro} from "../../model/livro";
import {NgForm, NgModel} from "@angular/forms";
import {Router} from "@angular/router";
import {LivrosService} from "../livros/livros.service";
import {PerfilService} from "./perfil.service";
import {PrincipalComponent} from "../principal.component";
import {LivroService} from "../livro/livro.service";
import {ToastrService} from "ngx-toastr";
import {PessoasService} from "../pessoas/pessoas.service";
import {PrateleiraLivro} from "../../model/prateleiraLivro";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {delay, timeout} from "rxjs";
import {Senha} from "../../model/senha";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = new Usuario();
  usuarioLogado: Usuario = new Usuario();
  usuarioForEdit: Usuario = new Usuario();

  livros: Livro[] = []

  allLivros: Livro[] = []

  livro: Livro = new Livro();

  capa: boolean = false;

  pdf: boolean = false;

  foto: boolean = false;

  concorda: boolean = false;

  meusLivros: boolean = false;

  senha: Senha = new Senha();

  type = "password";

  constructor(private router: Router, private serviceLivros: LivrosService,
              private service: PerfilService, private principal: PrincipalComponent, private serviceLivro: LivroService,
              private toastr: ToastrService, private servicePessoas: PessoasService,
              /*private location: Location*/) {
  }

  ngOnInit(): void {
    if (this.servicePessoas.pessoa == undefined) {
      this.usuarioLogado = this.principal.usuarioLogado;
      this.usuario = this.usuarioLogado;
      this.usuarioForEdit.id = this.usuario.id;
      this.usuarioForEdit.nome = this.usuario.nome;
      this.usuarioForEdit.email = this.usuario.email;
      this.usuarioForEdit.foto = this.usuario.foto;
      this.meusLivros = true;
      if(this.usuario.foto !== "icon-usuario.png"){
        this.usuario.oldFoto = this.usuario.foto
      }
    } else {
      this.usuarioLogado = this.principal.usuarioLogado;
      this.usuario = this.servicePessoas.pessoa;
      this.servicePessoas.pessoa = undefined;
    }
    this.listar();
  }

  listar() {
    if (this.meusLivros) {
      this.service.listarMyLivros(this.usuario.id).subscribe((res) => {
        this.allLivros = res;
        this.livros = this.allLivros;
      });
    } else {
      this.service.listarTheyLivros(this.usuarioLogado.id, this.usuario.id).subscribe((res) => {
        this.allLivros = res;
        this.livros = this.allLivros;
      });
    }

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

      let element = document.querySelector('.capa') as HTMLLIElement
      element.style.backgroundColor = '#ad9001';
      element.textContent = 'Alterar imagem'
      element = document.querySelector('.pdf') as HTMLLIElement
      element.style.backgroundColor = '#ad9001';
      element.textContent = 'Alterar pdf'
      form.resetForm();
    }
  }

  showPopupUsuario(popup: HTMLElement, action: boolean, form: NgForm | any) {
    this.usuarioForEdit = {...this.usuario};
    if (action) {
      popup.style.visibility = 'visible'
      popup.style.opacity = '1'
    } else {
      popup.style.visibility = 'hidden'
      popup.style.opacity = '0'

      let element = document.querySelector('.foto') as HTMLLIElement
      element.style.backgroundColor = '#ad9001';
      element.textContent = 'Alterar imagem'
      form.resetForm();
    }
  }

  showPopupSenha(popup: HTMLElement, action: boolean, form: NgForm | any) {
    if (action) {
      popup.style.visibility = 'visible'
      popup.style.opacity = '1'
    } else {
      popup.style.visibility = 'hidden'
      popup.style.opacity = '0'

      let element = document.querySelector('.capa') as HTMLLIElement
      element.style.backgroundColor = '#ad9001';
      element.textContent = 'Alterar imagem'
      form.resetForm();
    }
  }

  desativarConta() {
    this.service.desativarPerfil(this.usuario).subscribe(() => {

      },
      () => {
        this.toastr.success('Conta desativada!', 'Confirmação', {
          closeButton: true,
        });
        if (this.usuarioLogado.permissao.id != 1) {
          this.principal.sair();
        }
    })

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
    } else {
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

  returnInteresse(status: string) {
    switch (status) {
      case "interesse":
        return "icon-marcador-cheio.png"
      case "":
        return "icon-marcador-vazio.png"
      default:
        return "icon-marcador-vazio.png"
    }
  }

  mudarInteresse(livro: Livro, marcador: HTMLDivElement) {
    if (marcador) {
      const prateleiraLivro: PrateleiraLivro = new PrateleiraLivro();
      prateleiraLivro.id_livro = livro.id
      prateleiraLivro.id_pessoa = this.principal.usuarioLogado.id
      this.service.mudarInteresse(prateleiraLivro).subscribe((res) =>{
        if (livro.status === "interesse") {
          marcador.setAttribute('src', "assets/img/icon-marcador-vazio.png");
        } else {
          marcador.setAttribute('src', "assets/img/icon-marcador-cheio.png");
        }
      })
    }
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

  excluirLivro(livro: Livro) {
    this.serviceLivro.excluir(livro).subscribe((res) => {
      this.listar();
      this.toastr.success('Excluido com sucesso!', 'Confirmação', {
        closeButton: true,
      });
    }, () => {

    })
  }

  pesquisa(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.livros = this.allLivros.filter(livro => {
      return livro.nome.toLowerCase().includes(value.toLowerCase());
    })
  }

  mudarParaLivro(livro: Livro) {
    this.serviceLivros.setlivro(livro)
    this.router.navigate(['/principal/livro']);
  }

  inputFotoFile(event: any) {

    if (event.target.files && event.target.files[0]) {
      const foto: File = event.target.files[0];
      if (foto) {
        const previewDiv = document.getElementById('preview');
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          const image = new Image();
          image.src = reader.result as string;

          image.addEventListener('load', () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const MAX_WIDTH = 160;
            const MAX_HEIGHT = 200;

            let width = image.width;
            let height = image.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;

            // @ts-ignore
            ctx.drawImage(image, 0, 0, width, height);

            // @ts-ignore
            previewDiv.innerHTML = '';
            // @ts-ignore
            previewDiv.appendChild(canvas);
          });

        });

        reader.readAsDataURL(foto);
      }

      const formData = new FormData();
      formData.append('foto', foto);

      this.service.cadastrarFoto(formData).subscribe(() => {
        }
        , (error) => {
          this.usuarioForEdit.foto = error.error.text;
          this.foto = true;
          let element = document.querySelector('.foto') as HTMLLIElement
          element.style.backgroundColor = 'forestgreen';
          element.textContent = 'Imagem Selecionada'
        })
    }
  }

  editarUsuario(popup: HTMLElement, form: any, load: HTMLDivElement) {
    if (this.foto) {
      load.style.visibility = "visible"
      this.service.editarPerfil(this.usuarioForEdit).subscribe((event: HttpEvent<Object>) => {
        if (event.type === HttpEventType.Response) {
          this.showPopupUsuario(popup, false, form);
          load.style.visibility = "hidden"
          this.toastr.success('Editado com sucesso!', 'Confirmação', {
            closeButton: true,
          });
          // @ts-ignore
          this.usuario = event.body;
          // @ts-ignore
          this.principal.usuarioLogado = event.body;
          sessionStorage.setItem('usuario-logado', JSON.stringify(event.body));
          let element = document.querySelector('.imgPerfil-perfil') as HTMLLIElement;
          element.style.backgroundImage = 'url(assets/img/' + this.usuario.foto + '?'+new Date().getTime()+')';
          //this.router.navigateByUrl('/principal/perfil', { skipLocationChange: true }).then(() => {
            window.location.reload();
          //});
        }
      })
    } else {
      this.toastr.warning("Existem campos não preenchidos", "Atenção!")
    }

  }

  editarSenha(popup: HTMLElement, form: any, load: HTMLDivElement) {
    this.senha.id_usuario = this.usuarioLogado.id;
    if (this.senha.newSenha === this.senha.confirmSenha) {
      this.service.editarSenha(this.senha).subscribe((res) => {
        if (res == 1) {
          this.toastr.success("Senha alterada com sucesso!", "Confirmação");
          this.showPopup(popup, false, form);
        } else {
          this.toastr.warning("Senha antiga incorreta!", "Atenção")
        }
      })
    } else {
      this.toastr.warning("A senha nova e a confirmação não estão iguais!", "Atenção")
    }
  }

  verSenha(){
    if (this.type == "text") {
      this.type = "password"
    } else {
      this.type = "text"
    }
  }
}
