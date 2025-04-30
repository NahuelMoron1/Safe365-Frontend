import { AvailabilityDays } from './enums/AvailabilityDays';

export class Availability {
  id: string;
  attendantID: string;
  dayOfWeek: AvailabilityDays;
  startTime: string;
  endTime: string;

  constructor(
    id: string,
    attendantID: string,
    dayOfWeek: AvailabilityDays,
    startTime: string,
    endTime: string
  ) {
    this.id = id;
    this.attendantID = attendantID;
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
