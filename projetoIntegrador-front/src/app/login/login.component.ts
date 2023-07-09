import {Component, OnInit} from '@angular/core';
import {Usuario} from "../model/usuario";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {NgForm, NgModel} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  usuario: Usuario = new Usuario();

  constructor(private router: Router, private service: LoginService, private toastr: ToastrService) {}

  ngOnInit() {
  }

  logar(): void{
    this.service.login(this.usuario).subscribe(u => {
      this.service.setarUsuarioLogado(u);
      this.router.navigate(['/principal/prateleira'])
    },
    ()=>{
      this.toastr.error("Email ou senha incorretos!")
    })
  }
  saveLogin(form: NgForm){
    this.logar();
    form.resetForm();
  }
  cadastrar(){
    this.router.navigate(['/cadastrar'])
  }

  verSenha(input: HTMLInputElement){
    if(input.type == "text")
      input.type = "password"
    else
      input.type = "text"
  }
}
