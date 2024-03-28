import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { HotelsService } from 'app/hotels/hotels.service';
import { HotelsDTO } from 'app/hotels/hotels.model';


@Component({
  selector: 'app-hotels-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hotels-list.component.html'})
export class HotelsListComponent implements OnInit, OnDestroy {

  hotelsService = inject(HotelsService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  hotelses?: HotelsDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@hotels.delete.success:Hotels was removed successfully.`,
      'hotels.rooms.rooms.referenced': $localize`:@@hotels.rooms.rooms.referenced:This entity is still referenced by Rooms ${details?.id} via field Rooms.`
    };
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
    this.hotelsService.getAllHotelses()
        .subscribe({
          next: (data) => this.hotelses = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(idHotel: number) {
    if (confirm(this.getMessage('confirm'))) {
      this.hotelsService.deleteHotels(idHotel)
          .subscribe({
            next: () => this.router.navigate(['/hotelss'], {
              state: {
                msgInfo: this.getMessage('deleted')
              }
            }),
            error: (error) => {
              if (error.error?.code === 'REFERENCED') {
                const messageParts = error.error.message.split(',');
                this.router.navigate(['/hotelss'], {
                  state: {
                    msgError: this.getMessage(messageParts[0], { id: messageParts[1] })
                  }
                });
                return;
              }
              this.errorHandler.handleServerError(error.error)
            }
          });
    }
  }

}
