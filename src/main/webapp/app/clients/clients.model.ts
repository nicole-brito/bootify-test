export class ClientsDTO {

  constructor(data:Partial<ClientsDTO>) {
    Object.assign(this, data);
  }

  cpfClient?: number|null;
  nameClient?: string|null;
  phoneClient?: number|null;

}
