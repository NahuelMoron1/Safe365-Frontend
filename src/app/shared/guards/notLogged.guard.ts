import { inject } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from '../services/cookie.service';
import { AuthRedirectService } from '../services/auth-redirect.service';

export const notLoggedGuard = async (state: RouterStateSnapshot) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const redirectService = inject(AuthRedirectService);

  let tokenExist = false;
  (await cookieService.tokenExistTC('access_token')).subscribe((data) => {
    tokenExist = data;
  });
  if (!tokenExist) {
    redirectService.setRedirectUrl(state.url);
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
