export class Review {
  id: string;
  userID: string;
  attendantID: string;
  rating: number;
  comment: string;
  dateCreated: Date;

  constructor(
    id: string,
    userID: string,
    attendantID: string,
    rating: number,
    comment: string,
    dateCreated: Date
  ) {
    this.id = id;
    this.userID = userID;
    this.attendantID = attendantID;
    this.rating = rating;
    this.comment = comment;
    this.dateCreated = dateCreated;
  }
}
