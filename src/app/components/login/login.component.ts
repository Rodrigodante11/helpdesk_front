import { Component, OnInit } from '@angular/core';
import {Credenciais} from "../../../models/credenciais";
import {FormControl, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null , Validators.email); // valida para formato email
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  logar(){
    this.toastr.error('Usuario e/ou senha Invalido(s)' , 'Login Invalido');
    this.creds.senha = '' ;
  }

  validaCampos(): boolean {
    if(this.email.valid && this.senha.valid) {
      return true;
    } else return false;
  }

}
