import { Component, OnInit } from '@angular/core';
import {Credenciais} from "../../../models/credenciais";
import {FormControl, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {resolve} from "@angular/compiler-cli/src/ngtsc/file_system";
import {Router} from "@angular/router";

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

  constructor(
      private toastr: ToastrService,
      private service: AuthService,
      private router: Router
      ) { }

  ngOnInit(): void {
  }

  logar(){
    this.service.authentocated(this.creds).subscribe(responsta => {
      this.service.sucessfulLofin(responsta.headers.get('authorization').substring(7))
      this.router.navigate([''])
    },() => {
      this.toastr.error('usuario/ou senha invalido(s)')
    })
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }

}
