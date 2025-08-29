import { NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRole } from '../../../models/enums/UserRole';
import { Socialwork } from '../../../models/Socialwork';
import { User } from '../../../models/User';
import { ErrorService } from '../../../services/error.service';
import { UserService } from '../../../services/user.service';
import { SearchDoctorComponent } from '../../search-doctor/search-doctor.component';

@Component({
  selector: 'app-doctors-select',
  imports: [NgIf, FormsModule, NgFor, SearchDoctorComponent],
  templateUrl: './doctors-select.component.html',
  styleUrl: './doctors-select.component.css',
})
export class DoctorsSelectComponent {
  @Input()
  public user?: User;

  @Input()
  public socialWorks?: Socialwork[];

  @Input()
  public socialwork?: string;

  private userService = inject(UserService);
  private errorService = inject(ErrorService);

  public selectedList = 'attendant';
  public selectedStatus?: string = 'Todos';
  public showModifiedAlert?: boolean;
  public activeAttendants?: User[];

  OnChanges() {
    this.userService.getBehaviorSubject().subscribe((users) => {
      this.activeAttendants = users;
    });
  }

  async changeSocialwork(event: Event | string) {
    const selectedValue =
      typeof event === 'string'
        ? event
        : (event.target as HTMLSelectElement).value;
    const selectedSocialwork = this.socialWorks?.find(
      (sw) => sw.name === selectedValue
    );
    if (selectedSocialwork) {
      this.socialwork = selectedSocialwork.name;
      if (selectedSocialwork.id === '0') {
        if (this.selectedList === UserRole.ATTENDANT) {
          await this.userService.getActiveAttendantsTC();
          return;
        }
        await this.userService.getUsersListByAdminTC(
          this.selectedList,
          this.selectedStatus
        );
        return;
      }
      if (this.selectedList === UserRole.ATTENDANT) {
        await this.userService.getAttendantsBySocialworkTC(
          selectedSocialwork.id
        );
        return;
      }

      await this.userService.getUsersSocialworkByAdminTC(
        selectedSocialwork.id,
        this.selectedList,
        this.selectedStatus
      );
    }
  }

  async changeSelectedList() {
    if (this.user?.role !== UserRole.ADMIN) {
      return this.errorService.handleError(
        undefined,
        'No tiene permiso para realizar esta acción'
      );
    }
    if (!this.selectedList) {
      return this.errorService.handleError(
        undefined,
        'No hay un valor seleccionado'
      );
    }
    await this.userService.getUsersListByAdminTC(
      this.selectedList,
      this.selectedStatus
    );

    this.socialwork = 'Todas';
    this.OnChanges();
  }
}
