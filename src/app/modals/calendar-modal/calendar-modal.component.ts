import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { CalendarEvent, CalendarModule } from 'angular-calendar';
import { ErrorService } from '../../services/error.service';
import { SelectTimeModalComponent } from '../select-time-modal/select-time-modal.component';
import { SkyModalModule, SkyModalService } from '@skyux/modals';
import { SkyAlertModule } from '@skyux/indicators';
import { User } from '../../models/User';
import { Availability } from '../../models/Availability';
import { AvailabilityService } from '../../services/availability.service';
import { AvailabilityDays } from '../../models/enums/AvailabilityDays';
import { TurnService } from '../../services/turn.service';
import { Turn } from '../../models/Turn';

@Component({
  selector: 'app-calendar-modal',
  imports: [CommonModule, CalendarModule, SkyAlertModule, SkyModalModule],
  templateUrl: './calendar-modal.component.html',
  styleUrl: './calendar-modal.component.css',
})
export class CalendarModalComponent implements OnInit {
  private errorService = inject(ErrorService);
  private instance = inject(SkyModalService);
  private availabilityService = inject(AvailabilityService);
  private turnService = inject(TurnService);

  public showSuccessAlert?: boolean;
  public redirectCountdown: number = 10;
  public selectedTime?: string;
  public selectedDate?: Date;
  public showTimeSelector?: boolean;
  public viewDate: Date = new Date();
  public events?: CalendarEvent[];
  private countdownInterval: any;

  public attendantAvailability?: Availability[];

  timeSlots?: string[];

  constructor(
    @Inject('ATTENDANT') public attendant: User,
    @Inject('USER') public user: User
  ) {}

  async ngOnInit() {
    await this.getAttendantAvailability();
  }

  async onDayClick(event: { day: { date: Date } }) {
    const selectedDate = event.day.date;

    const isValidDate = await this.validateDaySelected(selectedDate);

    if (!isValidDate) {
      return;
    }
    const modalRef = this.instance.open(SelectTimeModalComponent, {
      providers: [
        {
          provide: 'TIME_SLOTS',
          useValue: this.timeSlots || [],
        },
        {
          provide: 'SELECTED_DATE',
          useValue: this.selectedDate || null,
        },
      ],
    });

    const result = await modalRef.closed.toPromise();

    if (!result || !result.data || !result.data.data) {
      return;
    }

    const scheduled = result.data.data;

    if (!(scheduled instanceof Date)) {
      return;
    }

    const created = await this.createTurn(scheduled);
    if (!created) {
      return;
    }
    this.showSuccessAlert = true;

    this.redirectCountdown = 10;

    this.countdownInterval = setInterval(() => {
      this.redirectCountdown--;
      if (this.redirectCountdown <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);

    setTimeout(() => {
      window.location.href = '/turns';
    }, 10000);
  }

  async createTurn(scheduled: Date) {
    try {
      if (
        !this.user ||
        !this.attendant ||
        !this.user.id ||
        !this.attendant.id
      ) {
        return this.errorService.handleError(
          undefined,
          'Faltan datos de usuario'
        );
      }

      if (!scheduled) {
        return this.errorService.handleError(
          undefined,
          'No hay una fecha seleccionada'
        );
      }

      const newTurn = new Turn(
        undefined,
        scheduled,
        this.attendant.directions,
        this.user.id,
        this.attendant.id,
        ''
      );

      await this.turnService.createTurn(newTurn).toPromise();
      return true;
    } catch (error) {
      this.errorService.handleError(error, 'Error al guardar turno');
      return false;
    }
  }

  async validateDaySelected(selectedDate: Date) {
    const isNotPast = this.validateDayBefore(selectedDate);
    if (!isNotPast) {
      return false;
    }

    const isAvailable = await this.validateAvailability(selectedDate);
    if (!isAvailable) {
      return false;
    }
    return true;
  }

  async validateAvailability(selectedDate: Date) {
    if (!this.attendantAvailability) return false;

    const dayOfWeek = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
    }) as AvailabilityDays;

    const availability = this.attendantAvailability.find(
      (availability) => availability.dayOfWeek === dayOfWeek
    );

    if (!availability) {
      this.errorService.handleError(
        undefined,
        'Lo sentimos, el medico no se encuentra disponible este día'
      );
      return false;
    }

    const isTimeAvailable = await this.validateHoursForAvailability(
      availability,
      selectedDate
    );

    if (!isTimeAvailable) {
      this.errorService.handleError(
        undefined,
        'Lo sentimos, no quedan turnos disponibles para este día'
      );
      return false;
    }

    return true;
  }

  async validateHoursForAvailability(
    availability: Availability,
    selectedDate: Date
  ) {
    if (!this.attendant || !this.attendant.id) {
      return false;
    }
    const startHour = parseInt(availability.startTime.split(':')[0], 10);
    const endHour = parseInt(availability.endTime.split(':')[0], 10);
    const result = await this.turnService
      .validateAttendantTurnsByDate(
        this.attendant.id,
        startHour,
        endHour,
        selectedDate
      )
      .toPromise();

    if (!result || !result.isValid) {
      return false;
    }

    this.timeSlots = result?.hours;
    return true;
  }

  validateDayBefore(selectedDate: Date) {
    const today = new Date();

    // Ponemos la hora a 0 para comparar sólo la fecha sin tiempo
    const selectedDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
    const todayDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    if (selectedDay < todayDay) {
      this.errorService.handleError(
        undefined,
        'No podes seleccionar un dia que ya pasó'
      );
      return false;
    }

    this.selectedDate = selectedDate;
    return true;
  }

  async getAttendantAvailability() {
    if (!this.attendant || !this.attendant.id) {
      return false;
    }

    try {
      this.attendantAvailability =
        await this.availabilityService.getAttendantAvailabilityTC(
          this.attendant.id
        );

      return true;
    } catch (error) {
      this.errorService.handleError(
        error,
        'No se pudo obtener la disponibilidad'
      );

      return false;
    }
  }

  closeAlert() {
    this.showSuccessAlert = false;
  }

  closeModal() {
    this.instance.dispose();
  }

  goToNextMonth(): void {
    const currentMonth = this.viewDate.getMonth();
    const currentYear = this.viewDate.getFullYear();
    this.viewDate = new Date(currentYear, currentMonth + 1, 1);
  }
  goToPreviousMonth(): void {
    const currentMonth = this.viewDate.getMonth();
    const currentYear = this.viewDate.getFullYear();
    this.viewDate = new Date(currentYear, currentMonth - 1, 1);
  }
}
