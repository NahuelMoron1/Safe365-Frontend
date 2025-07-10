import { Component, Input, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { User } from '../../models/User';
import { SearchDoctorComponent } from './search-doctor/search-doctor.component';
import { NgIf } from '@angular/common';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { Router } from '@angular/router';
import { Socialwork } from '../../models/Socialwork';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { UserRole } from '../../models/enums/UserRole';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [
    NavBarComponent,
    SearchDoctorComponent,
    NgIf,
    DoctorsListComponent,
    RegisterDoctorComponent,
  ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit {
  @Input()
  public user?: User;

  public socialWorks?: Socialwork[];
  public isSearchPage?: boolean;
  public isRegister?: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url.includes('search')) {
      this.isSearchPage = true;
    } else if (this.router.url.includes('register')) {
      this.isRegister = true;
    } else {
      this.isSearchPage = false;
      this.isRegister = false;
    }
  }

  handleUser(user: any) {
    this.user = user;
  }
  isAdmin() {
    if (this.user?.role === UserRole.ADMIN) {
      return true;
    }
    return false;
  }
}
