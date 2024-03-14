import { Component, OnInit } from '@angular/core';
import { Chamado } from "../../../../models/chamados";
import { Cliente } from "../../../../models/cliente";
import { Tecnico } from "../../../../models/tecnico";
import { FormControl, Validators} from "@angular/forms";
import { ChamadoService } from "../../../services/chamado.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-chamado-readme',
  templateUrl: './chamado-readme.component.html',
  styleUrls: ['./chamado-readme.component.css']
})
export class ChamadoReadmeComponent implements OnInit {

  chamado: Chamado = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    observacao: '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  constructor(
      private chamadoService: ChamadoService,
      private toastService: ToastrService,
      private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id')
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe( resposta =>{
      this.chamado=resposta;
    }, ex => {
      this.toastService.error(ex.error.error)
    })
  }

  retornaStatus(status: any): string {
    if(status == '0') {
      return 'ABERTO'
    } else if(status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0') {
      return 'BAIXA'
    } else if(prioridade == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }

}
