import { Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { SettingsComponent } from './components/account/settings/settings.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { LoginComponent } from './components/login/login.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { TurnsComponent } from './components/turns/turns.component';
import { adminGuard } from './guards/admin.guard';
import { loggedGuard } from './guards/logged.guard';
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
