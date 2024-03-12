import { Component, OnInit } from '@angular/core';
import {TecnicoService} from "../../../services/tecnico.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Tecnico} from "../../../../models/tecnico";

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

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

  delete():void{
    this.service.delete(this.tecnico.id).subscribe(resposta => {
      this.toastr.success('Técnico Deletado com sucesso', 'Atualizado');
      this.router.navigate(['tecnicos'])
    }, ex =>{
      if(ex.error.errors){
        ex.error.errors.forEach(element =>{
          this.toastr.error(element.message);
        })
      }else this.toastr.error(ex.error.message);

    })
  }

}
