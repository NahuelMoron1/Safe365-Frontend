export class Review {
  id?: string;
  userID: string;
  attendantID: string;
  rating: number;
  comment?: string;
  dateCreated: Date;

  User?: {
    fullName: string;
    profileImage: string;
  };

  Attendant?: {
    fullName: string;
    profileImage: string;
  };

  constructor(
    userID: string,
    attendantID: string,
    rating: number,
    dateCreated: Date,
    comment?: string,
    id?: string
  ) {
    this.id = id;
    this.userID = userID;
    this.attendantID = attendantID;
    this.rating = rating;
    this.comment = comment;
    this.dateCreated = dateCreated;
  }
}
