import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrincipalComponent} from "./principal.component";
import { LivrosComponent } from './livros/livros.component';
import {PrateleiraModule} from "./prateleira/prateleira.module";
import {LivrosModule} from "./livros/livros.module";
import { PerfilComponent } from './perfil/perfil.component';
import { PessoasComponent } from './pessoas/pessoas.component';



@NgModule({
  declarations: [
    PrincipalComponent,
    LivrosComponent,
    PerfilComponent,
    PessoasComponent
  ],
  exports: [
    PrincipalComponent
  ],
    imports: [
        CommonModule,
        RouterOutlet,
        RouterModule,
        FormsModule,
        PrateleiraModule,
        LivrosModule,
        ReactiveFormsModule
    ]
})
export class PrincipalModule { }
