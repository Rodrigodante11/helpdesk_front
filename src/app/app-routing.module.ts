import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Para trabalhar com formulários no Angular
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Imports para componentes do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import {NavComponent} from "./components/nav/nav.component";
import {HomeComponent} from "./components/home/home.component";
import {TecnicoListComponent} from "./components/tecnico/tecnico-list/tecnico-list.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./auth/auth.guard";
import {TecnicoCreateComponent} from "./components/tecnico/tecnico-create/tecnico-create.component";
import {TecnicoUpdateComponent} from "./components/tecnico/tecnico-update/tecnico-update.component";
import {TecnicoDeleteComponent} from "./components/tecnico/tecnico-delete/tecnico-delete.component";
import {ClienteListComponent} from "./components/cliente/cliente-list/cliente-list.component";
import {ClienteCreateComponent} from "./components/cliente/cliente-create/cliente-create.component";
import {ClienteUpdateComponent} from "./components/cliente/cliente-update/cliente-update.component";
import {ClienteDeleteComponent} from "./components/cliente/cliente-delete/cliente-delete.component";
import {ChamadoListComponent} from "./components/chamados/chamado-list/chamado-list.component";
import {ChamadoCreateComponent} from "./components/chamados/chamado-create/chamado-create.component";
import {ChamadoUpdateComponent} from "./components/chamados/chamado-update/chamado-update.component";
import {ChamadoReadmeComponent} from "./components/chamados/chamado-readme/chamado-readme.component";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: NavComponent, canActivate: [AuthGuard], children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'tecnicos',
                component: TecnicoListComponent
            },
            {
                path: 'tecnicos/create',
                component: TecnicoCreateComponent
            },
            {
                path: 'tecnicos/update/:id',
                component: TecnicoUpdateComponent
            },
            {
                path: 'tecnicos/delete/:id',
                component: TecnicoDeleteComponent
            },


            {
                path: 'clientes',
                component: ClienteListComponent
            },
            {
                path: 'clientes/create',
                component: ClienteCreateComponent
            },
            {
                path: 'clientes/update/:id',
                component: ClienteUpdateComponent
            },
            {
                path: 'clientes/delete/:id',
                component: ClienteDeleteComponent
            },

            {
                path: 'chamados',
                component: ChamadoListComponent
            },
            {
                path: 'chamados/create',
                component: ChamadoCreateComponent
            },
            {
                path: 'chamados/update/:id',
                component: ChamadoUpdateComponent
            },
            {
                path: 'chamados/readme/:id',
                component: ChamadoReadmeComponent
            },


        ]
    }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes),
      BrowserModule,
      BrowserAnimationsModule,
      // Forms
      FormsModule,
      ReactiveFormsModule,
      // Requisições http
      HttpClientModule,
      // Angular Material
      MatFormFieldModule,
      MatPaginatorModule,
      MatCheckboxModule,
      MatSnackBarModule,
      MatToolbarModule,
      MatSidenavModule,
      MatButtonModule,
      MatSelectModule,
      MatInputModule,
      MatRadioModule,
      MatTableModule,
      MatIconModule,
      MatListModule,
      MatCardModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
