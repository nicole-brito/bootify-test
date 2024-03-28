import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { ClientsService } from 'app/clients/clients.service';
import { ClientsDTO } from 'app/clients/clients.model';


@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './clients-list.component.html'})
export class ClientsListComponent implements OnInit, OnDestroy {

  clientsService = inject(ClientsService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  clientses?: ClientsDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@clients.delete.success:Clients was removed successfully.`,
      'clients.rooms.clientRooms.referenced': $localize`:@@clients.rooms.clientRooms.referenced:This entity is still referenced by Rooms ${details?.id} via field Client Rooms.`
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
    this.clientsService.getAllClientses()
        .subscribe({
          next: (data) => this.clientses = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(cpfClient: number) {
    if (confirm(this.getMessage('confirm'))) {
      this.clientsService.deleteClients(cpfClient)
          .subscribe({
            next: () => this.router.navigate(['/clientss'], {
              state: {
                msgInfo: this.getMessage('deleted')
              }
            }),
            error: (error) => {
              if (error.error?.code === 'REFERENCED') {
                const messageParts = error.error.message.split(',');
                this.router.navigate(['/clientss'], {
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
