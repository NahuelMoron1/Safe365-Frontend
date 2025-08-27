import { Component, inject, OnInit } from '@angular/core';
import { UserRole } from '../../models/enums/UserRole';
import { UserStatus } from '../../models/enums/UserStatus';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { SkyToastService, SkyToastType } from '@skyux/toast';
import { UtilsService } from '../../services/utils.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ErrorService } from '../../services/error.service';
import { ActivatedRoute } from '@angular/router';
import { AuthRedirectService } from '../../services/auth-redirect.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private userService = inject(UserService);
  private toastSvc = inject(SkyToastService);
  private errorService = inject(ErrorService);
  private redirectService = inject(AuthRedirectService);

  public user: User = new User('', '', '', '', '', UserRole.CLIENT);
  private route?: ActivatedRoute;

  async login() {
    let emailInp = document.getElementById('emailInp') as HTMLInputElement;
    let passwordInp = document.getElementById(
      'passwordInp'
    ) as HTMLInputElement;
    let email = '';
    let password = '';
    if (emailInp && passwordInp) {
      email = emailInp.value;
      password = passwordInp.value;
      try {
        const access = await this.userService
          .login(email, password)
          .toPromise();
        if (access) {
          window.location.href = this.redirectService.getRedirectUrl() || '/';
        }
      } catch (error: any) {
        this.errorService.handleError(error, 'No se pudo iniciar sesión');
      }
    }
  }
}
