import { Routes } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { LoginComponent } from './components/login/login.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { loggedGuard } from './guards/logged.guard';
import { RegisterDoctorComponent } from './components/doctors/register-doctor/register-doctor.component';
import { adminGuard } from './guards/admin.guard';
import { TurnsComponent } from './components/turns/turns.component';
import { AccountComponent } from './components/account/account.component';
import { CalendarModalComponent } from './modals/calendar-modal/calendar-modal.component';
import { SettingsComponent } from './components/account/settings/settings.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { notLoggedGuard } from './guards/notLogged.guard';

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
    canActivate: [adminGuard],
  },
  {
    path: 'register',
    component: DoctorsComponent,
    canActivate: [loggedGuard],
  },
  {
    path: 'turns',
    component: TurnsComponent,
    canActivate: [notLoggedGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [notLoggedGuard],
  },
  {
    path: 'account/settings',
    component: SettingsComponent,
    canActivate: [notLoggedGuard],
  },
  {
    path: 'reviews',
    component: ReviewsComponent,
    canActivate: [notLoggedGuard],
  },
];
