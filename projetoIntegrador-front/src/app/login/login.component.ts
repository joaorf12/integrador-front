import {Component, OnInit} from '@angular/core';
import {Usuario} from "../model/usuario";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  usuario: Usuario = new Usuario();

  constructor(private router: Router, private service: LoginService) {}

  ngOnInit() {
  }

  logar(): void{
    this.service.login(this.usuario).subscribe(u => {
      this.service.setarUsuarioLogado(u);
      this.router.navigate(['/principal/prateleira'])
    })
  }
  saveLogin(form: NgForm){
    this.logar();
    form.resetForm();
  }
  cadastrar(){
    this.router.navigate(['/cadastrar'])
  }
}
