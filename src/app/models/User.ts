import { AttendantXSocialwork } from './AttendantXSocialwork';
import { UserRole } from './enums/UserRole';
import { UserStatus } from './enums/UserStatus';

export class User {
  fullName: string;
  email: string;
  phone: string;
  userID: string;
  socialworkID: string;
  id?: string;
  password?: string;
  role?: UserRole;
  status?: UserStatus;
  speciality?: string;
  profileImage?: string;
  Socialwork?: string;
  AttendantXSocialworks?: AttendantXSocialwork[];

  constructor(
    fullName: string,
    email: string,
    phone: string,
    userID: string,
    socialworkID: string,
    password?: string,
    role?: UserRole,
    id?: string,
    speciality?: string,
    status?: UserStatus
  ) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.userID = userID;
    this.role = role;
    this.status = status;
    this.speciality = speciality;
    this.socialworkID = socialworkID;
  }
}
