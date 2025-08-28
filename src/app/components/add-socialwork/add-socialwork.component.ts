import { NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkyToastService, SkyToastType } from '@skyux/toast';
import { UserRole } from '../../models/enums/UserRole';
import { Socialwork } from '../../models/Socialwork';
import { User } from '../../models/User';
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
  private errorService = inject(ErrorService);
  private toastSvc = inject(SkyToastService);
  public socialworks?: Socialwork[];
  public newSocialworkName = '';

  async ngOnInit() {
    await this.getSocialworks();
  }

  async getSocialworks() {
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
      return this.errorService.handleError(
        error,
        'Error agregando cobertura medica'
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
      return this.errorService.handleError(
        error,
        'Error cambiando el estado de la cobertura medica'
      );
    }
  }

  //NOT DELETING ANY SOCIAL WORK AT THE MOMENT
  /*async deleteSocialwork(id: string) {
    this.socialworks = this.socialworks?.filter((sw) => sw.id !== id);
    await this.socialworkService.
  }*/

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
