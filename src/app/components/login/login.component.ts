import { Component, inject } from '@angular/core';
import { UserRole } from '../../models/enums/UserRole';
import { UserStatus } from '../../models/enums/UserStatus';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { SkyToastService, SkyToastType } from '@skyux/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userService = inject(UserService);
  toastSvc = inject(SkyToastService);
  user: User = new User(
    '',
    '',
    '',
    '',
    '',
    UserRole.CLIENT,
    UserStatus.ACTIVE,
    ''
  );

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
          window.location.href = '';
        } else {
          toastsvc;
        }
      } catch (error) {}
    }
  }
}
