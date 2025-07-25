import { Component, inject, Inject } from '@angular/core';
import { User } from '../../models/User';
import {
  SkyModalInstance,
  SkyModalModule,
  SkyModalService,
} from '@skyux/modals';
import { ErrorService } from '../../services/error.service';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRole } from '../../models/enums/UserRole';

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

  constructor(
    @Inject('ATTENDANT') public attendant: User,
    @Inject('USER') public user: User
  ) {}

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
      this.errorService.handleError(error, 'Error modificando personal');
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
}
