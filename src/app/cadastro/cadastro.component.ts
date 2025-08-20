
import { Component, inject, OnInit } from '@angular/core';

// Modulos e Angular Material:

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';

// Services:

import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { BrasilapiService } from '../brasilapi.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Estado, Municipio } from '../brasilapi.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    NgxMaskDirective,
    MatSelectModule,
    CommonModule,
],
  providers : [
    provideNgxMask()
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit{
  
  cliente: Cliente = Cliente.newCliente(); 
  atualizando: Boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  constructor(
    private service:ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private brasilApiService: BrasilapiService
  ){
  
  }
  
  ngOnInit() : void{
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params']
      const id = params['id']
      if(id){
        let clienteEncontrado = this.service.buscarClientesPorId(id);
        if(clienteEncontrado){
          this.atualizando = true;
          this.cliente = clienteEncontrado;
        }
      }
    })

    this.carregarUFs();
  }

  salvar(){
    if(!this.atualizando){
      this.service.salvar(this.cliente);
      this.mostrarMensagem('Salvo com sucesso!');
      this.cliente = Cliente.newCliente();
    } else{
      this.service.atualizar(this.cliente)
      this.router.navigate(['/consulta'])
      this.mostrarMensagem('Atualizado com sucesso!');
    }
  }

  carregarUFs(){
    this.brasilApiService.listarUFs().subscribe({
      next: listaEstados => this.estados = listaEstados,
      error: erro => console.log(erro)
    })
  }

  mostrarMensagem(mensagem: string){
    this.snack.open(mensagem, 'OK!');
  }
}
