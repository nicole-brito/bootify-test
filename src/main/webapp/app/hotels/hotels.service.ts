import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { HotelsDTO } from 'app/hotels/hotels.model';


@Injectable({
  providedIn: 'root',
})
export class HotelsService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/hotelss';

  getAllHotelses() {
    return this.http.get<HotelsDTO[]>(this.resourcePath);
  }

  getHotels(idHotel: number) {
    return this.http.get<HotelsDTO>(this.resourcePath + '/' + idHotel);
  }

  createHotels(hotelsDTO: HotelsDTO) {
    return this.http.post<number>(this.resourcePath, hotelsDTO);
  }

  updateHotels(idHotel: number, hotelsDTO: HotelsDTO) {
    return this.http.put<number>(this.resourcePath + '/' + idHotel, hotelsDTO);
  }

  deleteHotels(idHotel: number) {
    return this.http.delete(this.resourcePath + '/' + idHotel);
  }

}
