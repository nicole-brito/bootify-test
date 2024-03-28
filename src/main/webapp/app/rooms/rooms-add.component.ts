import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { RoomsService } from 'app/rooms/rooms.service';
import { RoomsDTO } from 'app/rooms/rooms.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-rooms-add',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './rooms-add.component.html'
})
export class RoomsAddComponent implements OnInit {

  roomsService = inject(RoomsService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  roomsValues?: Map<number,string>;
  clientRoomsValues?: Map<number,string>;

  addForm = new FormGroup({
    booked: new FormControl(false),
    hotel: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
    rooms: new FormControl(null),
    clientRooms: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@rooms.create.success:Rooms was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
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
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new RoomsDTO(this.addForm.value);
    this.roomsService.createRooms(data)
        .subscribe({
          next: () => this.router.navigate(['/roomss'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
