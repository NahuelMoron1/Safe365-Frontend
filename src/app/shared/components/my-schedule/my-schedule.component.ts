import { NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkyToastService, SkyToastType } from '@skyux/toast';
import { Availability } from '../../models/Availability';
import { AvailabilityDays } from '../../models/enums/AvailabilityDays';
import { User } from '../../models/User';
import { AvailabilityService } from '../../services/availability.service';
import { ErrorService } from '../../services/error.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-my-schedule',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './my-schedule.component.html',
  styleUrl: './my-schedule.component.css',
})
export class MyScheduleComponent implements OnInit {
  @Input()
  public user?: User;

  private availabilityService = inject(AvailabilityService);
  private errorService = inject(ErrorService);
  private toastSvc = inject(SkyToastService);

  public availability?: Availability[];
  public weekdays = [
    {
      key: AvailabilityDays.MONDAY,
      availabilityID: '',
      label: 'Lunes',
      enabled: false,
      startTime: '',
      endTime: '',
    },
    {
      key: AvailabilityDays.TUESDAY,
      availabilityID: '',
      label: 'Martes',
      enabled: false,
      startTime: '',
      endTime: '',
    },
    {
      key: AvailabilityDays.WEDNESDAY,
      availabilityID: '',
      label: 'Miércoles',
      enabled: false,
      startTime: '',
      endTime: '',
    },
    {
      key: AvailabilityDays.THURSDAY,
      availabilityID: '',
      label: 'Jueves',
      enabled: false,
      startTime: '',
      endTime: '',
    },
    {
      key: AvailabilityDays.FRIDAY,
      availabilityID: '',
      label: 'Viernes',
      enabled: false,
      startTime: '',
      endTime: '',
    },
  ];

  public timeOptions: string[] = [];

  async ngOnInit() {
    await this.getAvailability();
    this.loadAvailability();
    this.generateTimeOptions();
  }

  async getAvailability() {
    if (!this.user || !this.user.id) {
      return this.errorService.handleError(
        undefined,
        'Faltan datos de usuario'
      );
    }
    try {
      this.availability =
        await this.availabilityService.getAttendantAvailabilityTC(this.user.id);
    } catch (error) {
      return this.errorService.handleError(
        error,
        'Error leyendo datos de usuario'
      );
    }
  }

  public loadAvailability() {
    if (!this.availability) {
      for (const day of this.weekdays) {
        day.enabled = false;
        day.startTime = this.timeOptions[0];
        day.endTime = this.timeOptions[this.timeOptions.length - 1];
      }
      return;
    }

    for (const day of this.weekdays) {
      day.enabled = false;
      day.startTime = '08:00';
      day.endTime = '17:00';
    }

    for (const slot of this.availability) {
      const weekday = this.weekdays.find((d) => d.key === slot.dayOfWeek);
      if (weekday) {
        weekday.availabilityID = slot.id;
        weekday.enabled = true;
        weekday.startTime = slot.startTime.slice(0, 5);
        weekday.endTime = slot.endTime.slice(0, 5);
      }
    }
  }

  private generateTimeOptions() {
    const times: string[] = [];
    for (let h = 8; h <= 17; h++) {
      // horarios de 6 a 22hs
      for (let m = 0; m < 60; m += 30) {
        const hour = h.toString().padStart(2, '0');
        const minute = m.toString().padStart(2, '0');
        times.push(`${hour}:${minute}`);
      }
    }

    this.timeOptions = times;
  }

  async changeHours() {
    if (!this.user || !this.user.id) {
      return this.errorService.handleError(
        undefined,
        'Faltan datos de usuario'
      );
    }

    this.availability = [];
    const toDelete: string[] = [];
    let isNewDay = false;
    for (const [index, day] of this.weekdays.entries()) {
      if (day.enabled) {
        if (!day.availabilityID) {
          isNewDay = true;
          day.availabilityID = UtilsService.generateRandomId();
          this.weekdays[index].availabilityID = day.availabilityID;
        }

        const availability: Availability = new Availability(
          day.availabilityID,
          this.user.id,
          day.key,
          day.startTime,
          day.endTime
        );

        this.availability?.push(availability);
      } else {
        if (day.availabilityID) {
          toDelete.push(day.availabilityID);
        }
      }
    }

    try {
      for (const day of this.availability) {
        if (isNewDay) {
          await this.availabilityService
            .setAttendantAvailability(day)
            .toPromise();
        } else {
          await this.availabilityService
            .modifyAttendantAvailability(day)
            .toPromise();
        }
      }

      for (const idDelete of toDelete) {
        await this.availabilityService
          .deleteAttendantAvailability(idDelete)
          .toPromise();
      }

      UtilsService.openToast(
        this.toastSvc,
        'Horarios modificados correctamente',
        SkyToastType.Success
      );
      //location.reload();
    } catch (error) {
      this.errorService.handleError(error, 'Error modificando horarios');
    }
  }

  public getEndTimeOptions(startTime: string): string[] {
    return this.timeOptions.filter((t) => t > startTime);
  }

  public getStartTimeOptions(): string[] {
    return this.timeOptions.slice(0, this.timeOptions.length - 1);
  }
}
