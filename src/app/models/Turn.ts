import { TurnStatus } from './enums/TurnStatus';

export class Turn {
  id: string;
  date: Date;
  place: string;
  userID: string;
  attendantID: string;
  status: TurnStatus = TurnStatus.SCHEDULED;
  comments?: string;

  User?: {
    fullName: string;
    userID: string;
    Socialwork?: {
      name: string;
    };
  };

  Attendant?: {
    fullName: string;
    userID: string;
    // Podés agregar `Socialwork` también si lo incluís del médico
  };

  constructor(
    id: string,
    date: Date,
    place: string,
    userID: string,
    attendantID: string,
    comments?: string
  ) {
    this.id = id;
    this.date = date;
    this.place = place;
    this.userID = userID;
    this.attendantID = attendantID;
    this.comments = comments;
  }
}
