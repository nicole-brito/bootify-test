import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { RoomsDTO } from 'app/rooms/rooms.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class RoomsService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/roomss';

  getAllRoomses() {
    return this.http.get<RoomsDTO[]>(this.resourcePath);
  }

  getRooms(id: number) {
    return this.http.get<RoomsDTO>(this.resourcePath + '/' + id);
  }

  createRooms(roomsDTO: RoomsDTO) {
    return this.http.post<number>(this.resourcePath, roomsDTO);
  }

  updateRooms(id: number, roomsDTO: RoomsDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, roomsDTO);
  }

  deleteRooms(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

  getRoomsValues() {
    return this.http.get<Record<string,string>>(this.resourcePath + '/roomsValues')
        .pipe(map(transformRecordToMap));
  }

  getClientRoomsValues() {
    return this.http.get<Record<string,string>>(this.resourcePath + '/clientRoomsValues')
        .pipe(map(transformRecordToMap));
  }

}
