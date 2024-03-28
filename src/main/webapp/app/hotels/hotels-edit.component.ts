import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { HotelsService } from 'app/hotels/hotels.service';
import { HotelsDTO } from 'app/hotels/hotels.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm, validDouble } from 'app/common/utils';


@Component({
  selector: 'app-hotels-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './hotels-edit.component.html'
})
export class HotelsEditComponent implements OnInit {

  hotelsService = inject(HotelsService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  currentIdHotel?: number;

  editForm = new FormGroup({
    idHotel: new FormControl({ value: null, disabled: true }),
    reserved: new FormControl(false),
    nameHotel: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
    adressHotel: new FormControl(null, [Validators.required, Validators.maxLength(60)]),
    priceHotel: new FormControl(null, [validDouble]),
    phoneHotel: new FormControl(null, [Validators.required]),
    ratingHotel: new FormControl(null, [Validators.required])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@hotels.update.success:Hotels was updated successfully.`,
      HOTELS_NAME_HOTEL_UNIQUE: $localize`:@@Exists.hotels.nameHotel:This Name Hotel is already taken.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentIdHotel = +this.route.snapshot.params['idHotel'];
    this.hotelsService.getHotels(this.currentIdHotel!)
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
    const data = new HotelsDTO(this.editForm.value);
    this.hotelsService.updateHotels(this.currentIdHotel!, data)
        .subscribe({
          next: () => this.router.navigate(['/hotelss'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
