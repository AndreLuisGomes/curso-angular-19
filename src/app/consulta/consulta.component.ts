import { Component, OnInit } from '@angular/core';

// Modulos e Angular Material:
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';

import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';

import { Router } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    FlexLayoutModule,
    FormsModule,
    MatButton,
    CommonModule
  ],
  providers : [ provideNgxMask()],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  nomeBusca: string = "";
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ["id", "nome", "cpf", "dataNascimento", "email", "acoes"];

  constructor(
    private service: ClienteService,
    private router: Router
  ){

  }

  ngOnInit(){
    this.listaClientes = this.service.pesquisarClientes('');
  }
  
  formatarDataBr(data: string): string {
  if (!data || data.length !== 8) return data;

    const dia = data.substring(0, 2);
    const mes = data.substring(2, 4);
    const ano = data.substring(4, 8);

    return `${dia}/${mes}/${ano}`;
  }

  formatarCpfBr(cpf: string): string{
    if(!cpf || cpf.length !== 11) return cpf;
    
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  pesquisar(){
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }

  preparaEditar(id: string){
    this.router.navigate( ['/cadastro'], {queryParams: {"id" : id} } )
  }

  deletar(cliente: Cliente){
    this.service.deletar(cliente);
    this.ngOnInit()
  }
  
  preparaDeletar(cliente: Cliente){
    cliente.deletando = true;
  }

  cancelarDeletar(cliente: Cliente){
    cliente.deletando = false;
  }
  
}
