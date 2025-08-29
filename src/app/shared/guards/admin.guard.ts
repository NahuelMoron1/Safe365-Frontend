import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from '../services/cookie.service';
import { UserRole } from '../models/enums/UserRole';
import { User } from '../models/User';

export const adminGuard = async () => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  let user: User | undefined;
  (await cookieService.getUser()).subscribe((data) => {
    user = data;
  });
  if (!user || user.role !== UserRole.ADMIN) {
    router.navigate(['']);
    return false;
  }
  return true;
};
