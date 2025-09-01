import { NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SkyToastService, SkyToastType } from '@skyux/toast';
import { UserRole } from '../../models/enums/UserRole';
import { Socialwork } from '../../models/Socialwork';
import { User } from '../../models/User';
import { AttendantXSocialworkService } from '../../services/attendant-xsocialwork.service';
import { ErrorService } from '../../services/error.service';
import { SocialworksService } from '../../services/socialworks.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-add-socialwork',
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './add-socialwork.component.html',
  styleUrl: './add-socialwork.component.css',
})
export class AddSocialworkComponent implements OnInit {
  @Input()
  public user?: User;

  private socialworkService = inject(SocialworksService);
  private attendantXSocialworkService = inject(AttendantXSocialworkService);
  private errorService = inject(ErrorService);
  private toastSvc = inject(SkyToastService);
  private router = inject(Router);

  public socialworks?: Socialwork[];
  public attendantSocialworks?: Socialwork[];

  public newSocialworkName = '';
  public selectedSocialwork: string | null = null;

  async ngOnInit() {
    if (this.isAdmin()) {
      await this.getAdminSocialworks();
    } else if (this.user?.role === UserRole.ATTENDANT) {
      this.getAttendantSocialworks();
    }
  }

  async getAttendantSocialworks() {
    if (!this.user || !this.user.id || this.user.role !== UserRole.ATTENDANT) {
      return this.errorService.handleError(
        undefined,
        'No tiene permisos para ver esta información'
      );
    }
    this.attendantSocialworks =
      await this.socialworkService.getSocialworkByAttendantTC(this.user.id);

    const allSocialworks = await this.socialworkService.getAllSocialworksTC();

    if (!this.attendantSocialworks) {
      this.socialworks = allSocialworks;
      return;
    }

    const attendantIds = new Set(this.attendantSocialworks.map((sw) => sw.id));
    this.socialworks = allSocialworks?.filter((sw) => !attendantIds.has(sw.id));
  }

  async getAdminSocialworks() {
    if (!this.isAdmin()) {
      return this.errorService.handleError(
        undefined,
        'No tiene permisos para ver esta información'
      );
    }

    this.socialworks = await this.socialworkService.getAllSocialworksTC();
  }

  async addSocialwork() {
    try {
      if (!this.newSocialworkName.trim()) return;

      const newSw = new Socialwork(
        crypto.randomUUID(),
        this.newSocialworkName,
        true
      );

      await this.socialworkService.postSocialwork(newSw).toPromise();
      this.socialworks = [...(this.socialworks || []), newSw];
      this.newSocialworkName = '';

      UtilsService.openToast(
        this.toastSvc,
        'Cobertura médica cargada correctamente',
        SkyToastType.Success
      );
    } catch (error) {
      const fullUrl = `${window.location.origin}${this.router.url}`;
      const payload = {
        err: error,
        rawMessage: 'Error agregando cobertura medica',
        userID: this.user?.id,
        url: fullUrl,
      };

      return this.errorService.handleError(
        error,
        'Error agregando cobertura medica',
        payload
      );
    }
  }

  async toggleStatus(sw: Socialwork) {
    try {
      if (sw.active) {
        await this.socialworkService.setinActiveSocialwork(sw.id).toPromise();
      } else {
        await this.socialworkService.setActiveSocialwork(sw.id).toPromise();
      }
      sw.active = !sw.active;
    } catch (error) {
      const fullUrl = `${window.location.origin}${this.router.url}`;
      const payload = {
        err: error,
        rawMessage: 'Error cambiando el estado de la cobertura medica',
        userID: this.user?.id,
        url: fullUrl,
      };

      return this.errorService.handleError(
        error,
        'Error cambiando el estado de la cobertura medica',
        payload
      );
    }
  }

  returnSocialworks() {
    if (this.isAdmin()) {
      return this.socialworks;
    } else if (this.user?.role === UserRole.ATTENDANT) {
      return this.attendantSocialworks;
    }
    return [];
  }

  async deleteAttendantXSocialwork(id: string) {
    if (!this.user?.id || this.user?.role !== UserRole.ATTENDANT) {
      return this.errorService.handleError(
        undefined,
        'No tiene permiso para realizar esta acción'
      );
    }

    try {
      await this.attendantXSocialworkService
        .deleteSocialwork(this.user.id, id)
        .toPromise();

      const socialworkAux = this.attendantSocialworks?.find(
        (sw) => sw.id === id
      );
      if (socialworkAux) {
        this.socialworks?.push(socialworkAux);
      }
      this.attendantSocialworks = this.attendantSocialworks?.filter(
        (sw) => sw.id !== id
      );

      UtilsService.openToast(
        this.toastSvc,
        'Cobertura médica eliminada exitosamente',
        SkyToastType.Success
      );
    } catch (error) {
      const fullUrl = `${window.location.origin}${this.router.url}`;
      const payload = {
        err: error,
        rawMessage: 'Error eliminando cobertura medica',
        userID: this.user?.id,
        url: fullUrl,
      };

      return this.errorService.handleError(
        error,
        'Error eliminando cobertura medica',
        payload
      );
    }
  }

  async addAttendantXSocialwork() {
    if (this.user?.role !== UserRole.ATTENDANT) {
      return this.errorService.handleError(
        undefined,
        'No tiene permiso para realizar esta acción'
      );
    }

    if (!this.selectedSocialwork || this.selectedSocialwork === null) {
      return this.errorService.handleError(
        undefined,
        'Debe seleccionar una cobertura médica'
      );
    }

    try {
      const socialwork = this.socialworks?.find(
        (sw) => sw.id === this.selectedSocialwork
      );
      if (!socialwork) {
        return this.errorService.handleError(
          undefined,
          'No se encontró la cobertura médica'
        );
      }

      const attendantXSocialwork = {
        id: crypto.randomUUID(),
        attendantID: this.user.id,
        socialworkID: socialwork.id,
      };

      await this.attendantXSocialworkService
        .postSocialwork(attendantXSocialwork)
        .toPromise();

      this.attendantSocialworks?.push(socialwork);
      this.socialworks = this.socialworks?.filter(
        (sw) => sw.id !== socialwork.id
      );

      UtilsService.openToast(
        this.toastSvc,
        'Cobertura médica agregada exitosamente',
        SkyToastType.Success
      );
    } catch (error) {
      const fullUrl = `${window.location.origin}${this.router.url}`;
      const payload = {
        err: error,
        rawMessage: 'Error cargando cobertura médica',
        userID: this.user?.id,
        url: fullUrl,
      };

      return this.errorService.handleError(
        error,
        'Error cargando cobertura médica',
        payload
      );
    }
  }

  isAdmin() {
    if (!this.user) {
      return false;
    }
    if (this.user.role !== UserRole.ADMIN) {
      return false;
    }
    return true;
  }
}
