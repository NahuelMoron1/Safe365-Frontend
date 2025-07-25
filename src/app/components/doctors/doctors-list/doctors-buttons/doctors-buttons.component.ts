import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { User } from '../../../../models/User';
import { SkyModalService } from '@skyux/modals';
import { CalendarModalComponent } from '../../../../modals/calendar-modal/calendar-modal.component';
import { ManageAttendantModalComponent } from '../../../../modals/manage-attendant-modal/manage-attendant-modal.component';
import { SkyAlertModule } from '@skyux/indicators';

@Component({
  selector: 'app-doctors-buttons',
  imports: [NgIf, SkyAlertModule],
  templateUrl: './doctors-buttons.component.html',
  styleUrl: './doctors-buttons.component.css',
})
export class DoctorsButtonsComponent {
  @Input()
  public user?: User;

  @Input()
  public attendant?: User;

  public showModifiedAlert?: boolean;
  private instance = inject(SkyModalService);

  async openCalendarModal(attendantTurn: User) {
    const modalRef = this.instance.open(CalendarModalComponent, {
      providers: [
        {
          provide: 'ATTENDANT',
          useValue: attendantTurn,
        },
        {
          provide: 'USER',
          useValue: this.user,
        },
      ],
    });

    await modalRef.closed.toPromise();
  }

  async openManageAttendantModal(attendantTurn: User) {
    const modalRef = this.instance.open(ManageAttendantModalComponent, {
      providers: [
        {
          provide: 'ATTENDANT',
          useValue: attendantTurn,
        },
        {
          provide: 'USER',
          useValue: this.user,
        },
      ],
    });

    const result = await modalRef.closed.toPromise();

    if (!result || !result.data) {
      this.showModifiedAlert = false;
      return;
    }
    this.showModifiedAlert = true;
    console.log(this.showModifiedAlert);
  }
}
