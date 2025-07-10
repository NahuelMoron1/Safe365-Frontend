import { Routes } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { LoginComponent } from './components/login/login.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { loggedGuard } from './guards/logged.guard';
import { RegisterDoctorComponent } from './components/doctors/register-doctor/register-doctor.component';

export const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loggedGuard],
  },
  {
    path: 'search/attendant',
    component: DoctorsComponent,
  },
  {
    path: 'all/attendants',
    component: DoctorsComponent,
  },
  {
    path: 'register/doctor',
    component: DoctorsComponent,
  },
];
