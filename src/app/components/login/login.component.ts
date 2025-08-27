import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkyToastService } from '@skyux/toast';
import { UserRole } from '../../models/enums/UserRole';
import { User } from '../../models/User';
import { AuthRedirectService } from '../../services/auth-redirect.service';
import { ErrorService } from '../../services/error.service';
import { UserService } from '../../services/user.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

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
    const emailInp = document.getElementById('emailInp') as HTMLInputElement;
    const passwordInp = document.getElementById(
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
