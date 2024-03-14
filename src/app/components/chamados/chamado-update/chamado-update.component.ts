import { Component, OnInit } from '@angular/core';
import {Chamado} from "../../../../models/chamados";
import {Cliente} from "../../../../models/cliente";
import {Tecnico} from "../../../../models/tecnico";
import {FormControl, Validators} from "@angular/forms";
import {ChamadoService} from "../../../services/chamado.service";
import {ClienteService} from "../../../services/cliente.service";
import {TecnicoService} from "../../../services/tecnico.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

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

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status:     FormControl = new FormControl(null, [Validators.required]);
  titulo:     FormControl = new FormControl(null, [Validators.required]);
  observacao: FormControl = new FormControl(null, [Validators.required]);
  tecnico:    FormControl = new FormControl(null, [Validators.required]);
  cliente:    FormControl = new FormControl(null, [Validators.required]);

  constructor(
      private chamadoService: ChamadoService,
      private clienteService: ClienteService,
      private tecnicoService: TecnicoService,
      private toastService: ToastrService,
      private router: Router,
      private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id')
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe( resposta =>{
          this.chamado=resposta;
    }, ex => {
      this.toastService.error(ex.error.error)
    })
  }


  findAllClientes(): void{
    this.clienteService.findAll().subscribe( resposta => {
      this.clientes = resposta
    })
  }

  findAllTecnicos(): void{
    this.tecnicoService.findAll().subscribe( resposta => {
      this.tecnicos = resposta
    })
  }

  validaCampos(): boolean {
    return this.prioridade.valid && this.status.valid && this.titulo.valid
        && this.observacao.valid && this.tecnico.valid && this.cliente.valid
  }

  update(){
    this.chamado.dataAbertura = ''
    this.chamadoService.update(this.chamado).subscribe(resposta => {
      this.toastService.success('Chamado Atualizado com sucesso', 'Atalizado')
      this.router.navigate(['chamados'])

    }, ex => {
      this.toastService.error(ex.error.message);
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