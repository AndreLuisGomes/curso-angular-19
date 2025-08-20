import { Injectable, inject } from '@angular/core';
import { Cliente } from './cadastro/cliente';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";
  snack: MatSnackBar = inject(MatSnackBar);

  constructor() { }

  salvar(cliente: Cliente){
    const storage = this.obterStorage();
    storage.push(cliente);

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  pesquisarClientes(nomeBusca: string) : Cliente[]{

    const clientes = this.obterStorage();

    if(!nomeBusca){
      return clientes;
    }

    nomeBusca = nomeBusca.toLowerCase();
    return clientes.filter(cliente => cliente.nome?.toLowerCase().indexOf(nomeBusca) !== -1) 
  } 

  buscarClientesPorId(id: string) : Cliente | undefined{
    const clientes = this.obterStorage();
    return clientes.find(cliente => cliente.id === id)
  }

  private obterStorage() : Cliente[]{
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if(repositorioClientes){
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }

  atualizar(cliente: Cliente){
    const storage = this.obterStorage()
    storage.forEach(c => {
      if(c.id === cliente.id){
        Object.assign(c, cliente);
      }
    })
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage))
  }
  
  deletar(cliente : Cliente){
    this.snack.open('Deletado com sucesso!', 'OK!');
    const storage = this.obterStorage();
    const novaLista = storage.filter(c => c.id !== cliente.id);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(novaLista));
  }
}
