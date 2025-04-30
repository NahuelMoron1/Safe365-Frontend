import { TurnStatus } from './enums/TurnStatus';

export class Turn {
  id: string;
  date: Date;
  place: string;
  userID: string;
  attendantID: string;
  status: TurnStatus = TurnStatus.SCHEDULED;

  constructor(
    id: string,
    date: Date,
    place: string,
    userID: string,
    attendantID: string
  ) {
    this.id = id;
    this.date = date;
    this.place = place;
    this.userID = userID;
    this.attendantID = attendantID;
  }
}
