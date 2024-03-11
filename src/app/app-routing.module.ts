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
            }
            ,
            {
                path: 'tecnicos/update/:id',
                component: TecnicoUpdateComponent
            }
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
