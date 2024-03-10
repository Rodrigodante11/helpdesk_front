import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Tecnico} from '../../../../models/tecnico';
import {TecnicoService} from '../../../services/tecnico.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    "id": "",
    "nome" : "",
    "cpf" : "",
    "email": "",
    "senha": "",
    "perfils": [],
    "dataCriacao": "",
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(private service:TecnicoService, private toastr: ToastrService , private router:Router ) { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid ;
  }
  create():void{

    this.service.create(this.tecnico).subscribe(resposta => {
      this.toastr.success('Técnico cadastrado com sucesso', 'Cadastro');
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
}
