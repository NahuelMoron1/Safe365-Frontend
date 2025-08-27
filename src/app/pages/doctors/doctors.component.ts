import { NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorsListComponent } from '../../components/doctors-list/doctors-list.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { RegisterDoctorComponent } from '../../components/register-doctor/register-doctor.component';
import { SearchDoctorComponent } from '../../components/search-doctor/search-doctor.component';
import { UserRole } from '../../models/enums/UserRole';
import { Socialwork } from '../../models/Socialwork';
import { User } from '../../models/User';

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

  private router = inject(Router);

  ngOnInit(): void {
    this.checkRoutes();
  }

  checkRoutes() {
    if (this.router.url.includes('search')) {
      this.isSearchPage = true;
      this.isRegister = false;
    } else if (this.router.url.includes('register')) {
      this.isRegister = true;
      this.isSearchPage = false;
    } else {
      this.isSearchPage = false;
      this.isRegister = false;
    }
  }

  handleUser(user: any) {
    this.user = user;
  }
  isLogged() {
    return true;
  }
  isAdmin() {
    if (this.user?.role === UserRole.ADMIN) {
      return true;
    }
    return false;
  }
}
