import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { RoomsService } from 'app/rooms/rooms.service';
import { RoomsDTO } from 'app/rooms/rooms.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-rooms-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './rooms-edit.component.html'
})
export class RoomsEditComponent implements OnInit {

  roomsService = inject(RoomsService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  roomsValues?: Map<number,string>;
  clientRoomsValues?: Map<number,string>;
  currentId?: number;

  editForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    booked: new FormControl(false),
    hotel: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
    rooms: new FormControl(null),
    clientRooms: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@rooms.update.success:Rooms was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentId = +this.route.snapshot.params['id'];
    this.roomsService.getRoomsValues()
        .subscribe({
          next: (data) => this.roomsValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.roomsService.getClientRoomsValues()
        .subscribe({
          next: (data) => this.clientRoomsValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.roomsService.getRooms(this.currentId!)
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
    const data = new RoomsDTO(this.editForm.value);
    this.roomsService.updateRooms(this.currentId!, data)
        .subscribe({
          next: () => this.router.navigate(['/roomss'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}