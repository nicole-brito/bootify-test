import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HotelsListComponent } from './hotels/hotels-list.component';
import { HotelsAddComponent } from './hotels/hotels-add.component';
import { HotelsEditComponent } from './hotels/hotels-edit.component';
import { ClientsListComponent } from './clients/clients-list.component';
import { ClientsAddComponent } from './clients/clients-add.component';
import { ClientsEditComponent } from './clients/clients-edit.component';
import { RoomsListComponent } from './rooms/rooms-list.component';
import { RoomsAddComponent } from './rooms/rooms-add.component';
import { RoomsEditComponent } from './rooms/rooms-edit.component';
import { ErrorComponent } from './error/error.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: $localize`:@@home.index.headline:Welcome to your new app!`
  },
  {
    path: 'hotelss',
    component: HotelsListComponent,
    title: $localize`:@@hotels.list.headline:Hotelses`
  },
  {
    path: 'hotelss/add',
    component: HotelsAddComponent,
    title: $localize`:@@hotels.add.headline:Add Hotels`
  },
  {
    path: 'hotelss/edit/:idHotel',
    component: HotelsEditComponent,
    title: $localize`:@@hotels.edit.headline:Edit Hotels`
  },
  {
    path: 'clientss',
    component: ClientsListComponent,
    title: $localize`:@@clients.list.headline:Clientses`
  },
  {
    path: 'clientss/add',
    component: ClientsAddComponent,
    title: $localize`:@@clients.add.headline:Add Clients`
  },
  {
    path: 'clientss/edit/:cpfClient',
    component: ClientsEditComponent,
    title: $localize`:@@clients.edit.headline:Edit Clients`
  },
  {
    path: 'roomss',
    component: RoomsListComponent,
    title: $localize`:@@rooms.list.headline:Roomses`
  },
  {
    path: 'roomss/add',
    component: RoomsAddComponent,
    title: $localize`:@@rooms.add.headline:Add Rooms`
  },
  {
    path: 'roomss/edit/:id',
    component: RoomsEditComponent,
    title: $localize`:@@rooms.edit.headline:Edit Rooms`
  },
  {
    path: 'error',
    component: ErrorComponent,
    title: $localize`:@@error.headline:Error`
  },
  {
    path: '**',
    component: ErrorComponent,
    title: $localize`:@@notFound.headline:Page not found`
  }
];
