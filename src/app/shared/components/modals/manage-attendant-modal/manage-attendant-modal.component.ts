import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SkyModalInstance, SkyModalModule } from '@skyux/modals';
import { environment } from '../../../../environments/environment';
import { UserRole } from '../../../models/enums/UserRole';
import { ErrorService } from '../../../services/error.service';
import { UserService } from '../../../services/user.service';
import { ATTENDANT, USER } from '../../../tokens/token';

@Component({
  selector: 'app-manage-attendant-modal',
  imports: [NgIf, FormsModule, SkyModalModule],
  templateUrl: './manage-attendant-modal.component.html',
  styleUrl: './manage-attendant-modal.component.css',
})
export class ManageAttendantModalComponent {
  private errorService = inject(ErrorService);
  private instance = inject(SkyModalInstance);
  private userService = inject(UserService);
  private router = inject(Router);

  public attendant = inject(ATTENDANT);
  public user = inject(USER);

  private bffUrl?: string = environment.endpoint;

  async modifyAttendant() {
    try {
      if (!this.user || !this.attendant) {
        return this.errorService.handleError(undefined, 'Datos inexistentes');
      }
      if (this.user.role !== UserRole.ADMIN) {
        return this.errorService.handleError(
          undefined,
          'No tiene autorización para modificar datos sensibles del sistema'
        );
      }
      const changesValidated = this.validateAttendantChanges();
      if (!changesValidated) {
        return;
      }

      await this.userService.modifyUserByAdmin(this.attendant).toPromise();
      this.instance.close('ok');
    } catch (error) {
      const fullUrl = `${window.location.origin}${this.router.url}`;
      const payload = {
        err: error,
        rawMessage: 'Error modificando personal',
        userID: this.user?.id,
        url: fullUrl,
      };

      this.errorService.handleError(
        error,
        'Error modificando personal',
        payload
      );
      this.instance.close();
    }
  }

  validateAttendantChanges() {
    if (!this.attendant.status || !this.attendant.role) {
      this.errorService.handleError(
        undefined,
        'No todos los campos contienen un valor'
      );
      return false;
    }
    if (this.attendant.role !== UserRole.ATTENDANT) {
      this.attendant.speciality = '';
      return true;
    }
    if (!this.attendant.speciality || this.attendant.speciality === '') {
      this.errorService.handleError(
        undefined,
        'No todos los campos contienen un valor'
      );
      return false;
    }
    return true;
  }

  closeModal() {
    this.instance.close();
  }

  returnProfileImage(imageUrl?: string) {
    if (!this.bffUrl || !imageUrl) {
      return 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';
    }
    return this.bffUrl + imageUrl;
  }
}
