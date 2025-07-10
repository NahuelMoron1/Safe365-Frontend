import { AttendantSocialwork } from './AttendantSocialwork';

export class AttendantXSocialwork {
  id: string;
  Socialwork: AttendantSocialwork;

  constructor(id: string, Socialwork: AttendantSocialwork) {
    this.id = id;
    this.Socialwork = Socialwork;
  }
}
