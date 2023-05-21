import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./login.component";



@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule
  ]
})
export class LoginModule { }
