import {Component, OnInit} from '@angular/core';
import {Usuario} from "../model/usuario";
import {Router} from "@angular/router";
import {CadastrarService} from "./cadastrar.service";
import {NgForm} from "@angular/forms";
import {Permissao} from "../model/permissao";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit{
  usuario: Usuario = new Usuario();

  permissao: Permissao = new Permissao();

  constructor(private router: Router, private service: CadastrarService, private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  saveCadastro(form: NgForm){
    this.cadastrar();
    form.resetForm();
  }

  cadastrar(){
    this.service.cadastrar(this.usuario).subscribe(()=> {
      this.router.navigate(['/login'])
      this.toastr.success("Cadastro feito com sucesso!")
    })
  }

  voltar(): void{
    this.router.navigate(['/login'])
  }
}
