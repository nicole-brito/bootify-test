import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ClientsDTO } from 'app/clients/clients.model';


@Injectable({
  providedIn: 'root',
})
export class ClientsService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/clientss';

  getAllClientses() {
    return this.http.get<ClientsDTO[]>(this.resourcePath);
  }

  getClients(cpfClient: number) {
    return this.http.get<ClientsDTO>(this.resourcePath + '/' + cpfClient);
  }

  createClients(clientsDTO: ClientsDTO) {
    return this.http.post<number>(this.resourcePath, clientsDTO);
  }

  updateClients(cpfClient: number, clientsDTO: ClientsDTO) {
    return this.http.put<number>(this.resourcePath + '/' + cpfClient, clientsDTO);
  }

  deleteClients(cpfClient: number) {
    return this.http.delete(this.resourcePath + '/' + cpfClient);
  }

}
