import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ClientsService } from 'app/clients/clients.service';
import { ClientsDTO } from 'app/clients/clients.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-clients-add',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './clients-add.component.html'
})
export class ClientsAddComponent {

  clientsService = inject(ClientsService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  addForm = new FormGroup({
    nameClient: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
    phoneClient: new FormControl(null, [Validators.required])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@clients.create.success:Clients was created successfully.`
    };
    return messages[key];
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new ClientsDTO(this.addForm.value);
    this.clientsService.createClients(data)
        .subscribe({
          next: () => this.router.navigate(['/clientss'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
