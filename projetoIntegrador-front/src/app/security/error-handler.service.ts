import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginService} from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService extends ErrorHandler{

  constructor(private  router: Router, private service: LoginService) {
    super();
  }


  override handleError(error: HttpErrorResponse | any) {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 400:
          alert('Usuario ou senha Incorretos')
          break;
        case 500:
          alert("Token Expirado, por favor faça o login novamente");
          break;
      }
    }
  }
}
