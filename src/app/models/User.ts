import { UserRole } from './enums/UserRole';
import { UserStatus } from './enums/UserStatus';

export class User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  phone: string;
  userID: string;
  role: UserRole;
  status: UserStatus;
  speciality?: string;
  profileImage?: string;

  constructor(
    id: string,
    fullName: string,
    email: string,
    phone: string,
    userID: string,
    role: UserRole,
    status: UserStatus,
    password?: string
  ) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.userID = userID;
    this.role = role;
    this.status = status;
  }
}
