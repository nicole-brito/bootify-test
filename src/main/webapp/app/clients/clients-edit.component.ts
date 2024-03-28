import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ClientsService } from 'app/clients/clients.service';
import { ClientsDTO } from 'app/clients/clients.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-clients-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './clients-edit.component.html'
})
export class ClientsEditComponent implements OnInit {

  clientsService = inject(ClientsService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  currentCpfClient?: number;

  editForm = new FormGroup({
    cpfClient: new FormControl({ value: null, disabled: true }),
    nameClient: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
    phoneClient: new FormControl(null, [Validators.required])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@clients.update.success:Clients was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentCpfClient = +this.route.snapshot.params['cpfClient'];
    this.clientsService.getClients(this.currentCpfClient!)
        .subscribe({
          next: (data) => updateForm(this.editForm, data),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.editForm.markAllAsTouched();
    if (!this.editForm.valid) {
      return;
    }
    const data = new ClientsDTO(this.editForm.value);
    this.clientsService.updateClients(this.currentCpfClient!, data)
        .subscribe({
          next: () => this.router.navigate(['/clientss'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
