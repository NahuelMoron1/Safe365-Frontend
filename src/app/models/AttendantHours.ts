export class AttendantHours {
  isValid: boolean;
  hours: string[];

  constructor(isValid: boolean, hours: string[]) {
    this.isValid = isValid;
    this.hours = hours;
  }
}
