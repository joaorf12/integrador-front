import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../login/login.service";
import {PrincipalService} from "./principal.service";
import {Usuario} from "../model/usuario";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  usuarioLogado: Usuario = new Usuario();
  constructor(private router: Router, private service: PrincipalService, private serviceLogin: LoginService) {}

  ngOnInit() {
    this.usuarioLogado = this.serviceLogin.usuario_logado();
    var img_perfil = document.getElementsByClassName("imgPerfil");
    // @ts-ignore
    img_perfil.item(0).style.backgroundImage = "url('assets/img/" + this.usuarioLogado.foto + "')";
  }

  sair(): void{
    this.serviceLogin.logout();
  }

}
