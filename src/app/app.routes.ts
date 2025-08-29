import { Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { TurnsComponent } from './pages/turns/turns.component';
import { SettingsComponent } from './shared/components/settings/settings.component';
import { adminGuard } from './shared/guards/admin.guard';
import { loggedGuard } from './shared/guards/logged.guard';
import { notLoggedGuard } from './shared/guards/notLogged.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
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
