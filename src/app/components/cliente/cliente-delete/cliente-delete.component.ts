import { Component, OnInit } from '@angular/core';
import {ClienteService} from "../../../services/cliente.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Cliente} from "../../../../models/cliente";

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
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

  constructor(
      private service:ClienteService,
      private toastr: ToastrService ,
      private router:Router,
      private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.cliente.id = this.route.snapshot.paramMap.get('id')
    this.findById();

  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      this.cliente = resposta
      this.cliente.perfils.forEach((perfil, index) => {
        this.cliente.perfils[index] = this.perfilMapping[perfil];
        this.perfilChecked[perfil] = true;
      });

    }, ex =>{
      this.toastr.error("Cliente nao encontrado", "ERRO");

    })
  }

  delete():void{
    this.service.delete(this.cliente.id).subscribe(resposta => {
      this.toastr.success('Cliente Deletado com sucesso', 'Atualizado');
      this.router.navigate(['clientes'])
    }, ex =>{
      if(ex.error.errors){
        ex.error.errors.forEach(element =>{
          this.toastr.error(element.message);
        })
      }else this.toastr.error(ex.error.message);

    })
  }

}
