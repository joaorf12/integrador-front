import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {CadastrarComponent} from "./cadastrar/cadastrar.component";
import {PrincipalComponent} from "./principal/principal.component";
import {PrateleiraComponent} from "./principal/prateleira/prateleira.component";
import {LivrosComponent} from "./principal/livros/livros.component";
import {PerfilComponent} from "./principal/perfil/perfil.component";
import {LivroComponent} from "./principal/livro/livro.component";
import {PessoasComponent} from "./principal/pessoas/pessoas.component";
import {AuthGuardService} from "./security/auth-guard.service";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'cadastrar', component: CadastrarComponent, canActivate: [AuthGuardService] },
  { path: 'principal', component: PrincipalComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'prateleira', component: PrateleiraComponent, canActivate: [AuthGuardService]},
      { path: 'livros', component: LivrosComponent, canActivate: [AuthGuardService]},
      { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuardService]},
      { path: 'livro', component: LivroComponent, canActivate: [AuthGuardService]},
      { path: 'pessoas', component: PessoasComponent, canActivate: [AuthGuardService]}
      /*{ path: 'livro', component: LivrosComponent, canActivate: [AuthGuardService]},
      { path: 'sessao', component: SessaoComponent, canActivate: [AuthGuardService]},
      { path: 'emprestimo', component: EmprestimoComponent, canActivate: [AuthGuardService]}*/
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
