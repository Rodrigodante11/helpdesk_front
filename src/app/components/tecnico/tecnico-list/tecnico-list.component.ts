import {AfterViewInit, Component, ViewChild , OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Tecnico} from "../../../../models/tecnico";
import {TecnicoService} from "../../../services/tecnico.service";

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css'],
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes' ];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: TecnicoService ) { }

  ngOnInit(): void {
    this.findAll();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // pega o valor do filtro paga cada evento
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


