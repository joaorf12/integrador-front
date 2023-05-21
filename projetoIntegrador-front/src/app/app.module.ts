import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import {LoginModule} from "./login/login.module";
import {FormsModule} from "@angular/forms";
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import {CadastrarModule} from "./cadastrar/cadastrar.module";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {PrincipalModule} from "./principal/principal.module";
import { PrateleiraComponent } from './principal/prateleira/prateleira.component';
import { LivroComponent } from './principal/livro/livro.component';
import {ErrorHandlerService} from "./security/error-handler.service";
import {JwtinterceptorService} from "./security/jwtinterceptor.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    PrateleiraComponent,
    LivroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    CadastrarModule,
    PrincipalModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    /*PrincipalModule,*/
  ],
  providers: [
    {provide: ErrorHandler, useClass: ErrorHandlerService},
    {provide: HTTP_INTERCEPTORS, useClass: JwtinterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
