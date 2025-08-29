import { NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorsListComponent } from '../../shared/components/doctors-list/doctors-list.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { RegisterDoctorComponent } from '../../shared/components/register-doctor/register-doctor.component';
import { SearchDoctorComponent } from '../../shared/components/search-doctor/search-doctor.component';
import { UserRole } from '../../shared/models/enums/UserRole';
import { Socialwork } from '../../shared/models/Socialwork';
import { User } from '../../shared/models/User';

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
  public title?: string;

  private router = inject(Router);

  ngOnInit(): void {
    this.checkRoutes();
  }

  checkRoutes() {
    if (this.router.url.includes('search')) {
      this.isSearchPage = true;
      this.isRegister = false;
      this.title = 'Busqueda';
    } else if (this.router.url.includes('register')) {
      this.isRegister = true;
      this.isSearchPage = false;
      this.title = 'Registro';
    } else {
      this.isSearchPage = false;
      this.isRegister = false;
      this.title = 'Doctores';
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
