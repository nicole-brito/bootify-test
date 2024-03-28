export class HotelsDTO {

  constructor(data:Partial<HotelsDTO>) {
    Object.assign(this, data);
  }

  idHotel?: number|null;
  reserved?: boolean|null;
  nameHotel?: string|null;
  adressHotel?: string|null;
  priceHotel?: number|null;
  phoneHotel?: number|null;
  ratingHotel?: number|null;

}
