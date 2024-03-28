import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { HotelsService } from 'app/hotels/hotels.service';
import { HotelsDTO } from 'app/hotels/hotels.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { validDouble } from 'app/common/utils';


@Component({
  selector: 'app-hotels-add',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './hotels-add.component.html'
})
export class HotelsAddComponent {

  hotelsService = inject(HotelsService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  addForm = new FormGroup({
    reserved: new FormControl(false),
    nameHotel: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
    adressHotel: new FormControl(null, [Validators.required, Validators.maxLength(60)]),
    priceHotel: new FormControl(null, [validDouble]),
    phoneHotel: new FormControl(null, [Validators.required]),
    ratingHotel: new FormControl(null, [Validators.required])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@hotels.create.success:Hotels was created successfully.`,
      HOTELS_NAME_HOTEL_UNIQUE: $localize`:@@Exists.hotels.nameHotel:This Name Hotel is already taken.`
    };
    return messages[key];
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new HotelsDTO(this.addForm.value);
    this.hotelsService.createHotels(data)
        .subscribe({
          next: () => this.router.navigate(['/hotelss'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
