import { AttendantXSocialwork } from './AttendantXSocialwork';
import { UserRole } from './enums/UserRole';
import { UserStatus } from './enums/UserStatus';
import { Socialwork } from './Socialwork';

export class User {
  fullName: string;
  email: string;
  phone: string;
  userID: string;
  socialworkID: string;
  directions: string;
  id?: string;
  password?: string;
  role?: UserRole;
  status?: UserStatus;
  speciality?: string;
  profileImage?: string;
  Socialwork?: Socialwork;
  AttendantXSocialworks?: AttendantXSocialwork[];
  temporaryFile: File | null = null;

  constructor(
    fullName: string,
    email: string,
    phone: string,
    userID: string,
    socialworkID: string,
    directions: string,
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
    this.directions = directions;
  }
}
