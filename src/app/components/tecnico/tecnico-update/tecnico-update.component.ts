import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Tecnico} from '../../../../models/tecnico';
import {TecnicoService} from '../../../services/tecnico.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  tecnico: Tecnico = {
    "id": "",
    "nome" : "",
    "cpf" : "",
    "email": "",
    "senha": "",
    "perfils": [],
    "dataCriacao": "",
  }

  perfilChecked: { [key: string]: boolean } = { ADMIN: false, CLIENTE: false, TECNICO: false };

  perfilMapping = {
    'ADMIN': 1,
    'CLIENTE': 2,
    'TECNICO': 3
  };

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
      private service:TecnicoService,
      private toastr: ToastrService ,
      private router:Router,
      private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id')
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      this.tecnico = resposta
      this.tecnico.perfils.forEach((perfil, index) => {
        this.tecnico.perfils[index] = this.perfilMapping[perfil];
        this.perfilChecked[perfil] = true;
      });

    }, ex =>{
      this.toastr.error("Tecnico nao encontrado", "ERRO");
    })

  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid ;
  }
  update():void{

    if(!this.cpfValidation(this.tecnico.cpf)){
      this.toastr.error('Por favor informe um CPF valido', 'CPF invalido');
      return
    }

    this.service.update(this.tecnico).subscribe(resposta => {
      this.toastr.success('Técnico Atualizado com sucesso', 'Atualizado');
      this.router.navigate(['tecnicos'])
    }, ex =>{
      if(ex.error.errors){
        ex.error.errors.forEach(element =>{
          this.toastr.error(element.message);
        })
      }else this.toastr.error(ex.error.message);

    })
  }

  addPerfil(perfil: any): void {

    if( this.tecnico.perfils.includes(perfil)){ // se ja tem quer dizer que o click foi pra desmarcar
      this.tecnico.perfils.splice(this.tecnico.perfils.indexOf(perfil), 1) // retirando
    } else this.tecnico.perfils.push(perfil)

  }

  cpfValidation(cpf: string): boolean {
    if (cpf == null) {
      return false;
    }
    if (cpf.length != 11) {
      return false;
    }
    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
      return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) == -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
      return false;
    }
    else {
      return true;
    }
  }

}
