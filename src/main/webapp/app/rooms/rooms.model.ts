export class RoomsDTO {

  constructor(data:Partial<RoomsDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  booked?: boolean|null;
  hotel?: string|null;
  rooms?: number|null;
  clientRooms?: number|null;

}
