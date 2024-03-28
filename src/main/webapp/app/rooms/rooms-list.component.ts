import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { RoomsService } from 'app/rooms/rooms.service';
import { RoomsDTO } from 'app/rooms/rooms.model';


@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rooms-list.component.html'})
export class RoomsListComponent implements OnInit, OnDestroy {

  roomsService = inject(RoomsService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  roomses?: RoomsDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@rooms.delete.success:Rooms was removed successfully.`    };
    return messages[key];
  }

  ngOnInit() {
    this.loadData();
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription!.unsubscribe();
  }
  
  loadData() {
    this.roomsService.getAllRoomses()
        .subscribe({
          next: (data) => this.roomses = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(id: number) {
    if (confirm(this.getMessage('confirm'))) {
      this.roomsService.deleteRooms(id)
          .subscribe({
            next: () => this.router.navigate(['/roomss'], {
              state: {
                msgInfo: this.getMessage('deleted')
              }
            }),
            error: (error) => this.errorHandler.handleServerError(error.error)
          });
    }
  }

}
