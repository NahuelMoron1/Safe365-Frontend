import { DatePipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkyModalInstance, SkyModalModule } from '@skyux/modals';
import { ErrorService } from '../../services/error.service';
import { SELECTED_DATE, TIME_SLOTS } from '../../tokens/token';
@Component({
  selector: 'app-select-time-modal',
  imports: [FormsModule, SkyModalModule, NgFor, DatePipe],
  templateUrl: './select-time-modal.component.html',
  styleUrl: './select-time-modal.component.css',
})
export class SelectTimeModalComponent {
  timeSlots = inject(TIME_SLOTS);
  selectedDate = inject(SELECTED_DATE);

  private modal = inject(SkyModalInstance);
  private errorService = inject(ErrorService);

  selectedTime: string | null = null;
  selectedDateTime: Date | null = null;

  cancel() {
    this.modal.close({ data: null });
  }

  selectTime(time: string): void {
    this.selectedTime = time;

    this.selectedDateTime = new Date(this.selectedDate!);
    const [hours, minutes] = time.split(':').map(Number);
    this.selectedDateTime.setHours(hours, minutes, 0);
  }

  save() {
    if (!this.selectedDate) {
      return this.errorService.handleError(
        undefined,
        'No hay una fecha seleccionada'
      );
    }

    if (!this.selectedTime) {
      return this.errorService.handleError(
        undefined,
        'Tenes que seleccionar un horario para guardar'
      );
    }

    if (!this.selectedDateTime) {
      return this.errorService.handleError(
        undefined,
        'Ocurrió un error, pongase en contacto con un administrador'
      );
    }

    this.modal.close({ data: this.selectedDateTime });
  }
}
