import {AfterViewInit, Component, ViewChild , OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Tecnico} from "../../../../models/tecnico";

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css'],
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = [
    {
      id: 1,
      nome: 'Valdir cesar',
      cpf: '123.456.789-10',
      email: 'Valdir@email.com',
      senha: '1234',
      perfis: ['0'],
      dataCriacao: '15/08/2022'
    }
  ];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes' ];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}


