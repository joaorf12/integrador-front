import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CadastrarComponent} from "./cadastrar.component";
import {LoginComponent} from "../login/login.component";



@NgModule({
  declarations: [
    CadastrarComponent
  ],
  exports: [
    CadastrarComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule
  ]
})
export class CadastrarModule { }
