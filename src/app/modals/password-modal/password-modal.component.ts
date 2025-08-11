import { Component, inject, Inject } from '@angular/core';
import { User } from '../../models/User';
import { UserStatus } from '../../models/enums/UserStatus';
import { UserService } from '../../services/user.service';
import { SkyModalInstance, SkyModalModule } from '@skyux/modals';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../services/error.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-password-modal',
  imports: [SkyModalModule, FormsModule, RouterModule],
  templateUrl: './password-modal.component.html',
  styleUrl: './password-modal.component.css',
})
export class PasswordModalComponent {
  private userService = inject(UserService);
  private instance = inject(SkyModalInstance);
  private errorService = inject(ErrorService);

  public password?: string;
  public result: {
    status: boolean;
    message: string;
    password?: string;
  } = { status: false, message: '' };

  constructor(@Inject('USER') public user: User) {}

  async checkPasswordModal() {
    try {
      if (!this.checkUserLogged()) {
        return this.errorService.handleError(undefined, this.result.message);
      }

      const isValidPassword = await this.userService
        .validatePassword(this.password!)
        .toPromise();

      if (!isValidPassword) {
        this.result.status = false;
        this.result.message = 'La contraseña no coincide';
        return this.errorService.handleError(undefined, this.result.message);
      }

      this.result.status = true;
      this.result.message = 'Validación exitosa';
      this.result.password = this.password;
      this.instance.close(this.result);
    } catch (error) {
      this.errorService.handleError(error, 'Error verificando contraseña');
    }
  }

  checkUserLogged() {
    if (!this.user) {
      this.result.status = false;
      this.result.message = 'No ha iniciado sesión';
      return false;
    }

    if (this.user.status === UserStatus.INACTIVE) {
      this.result.status = false;
      this.result.message = 'No se encuentra activo para realizar cambios';
      return false;
    }

    if (!this.password) {
      this.result.status = false;
      this.result.message = 'No ha ingresado una contraseña';
      return false;
    }

    return true;
  }
}
