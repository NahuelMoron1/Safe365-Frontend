import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { SkyAlertModule } from '@skyux/indicators';
import { SkyModalService } from '@skyux/modals';
import { CalendarModalComponent } from '../../../../modals/calendar-modal/calendar-modal.component';
import { ManageAttendantModalComponent } from '../../../../modals/manage-attendant-modal/manage-attendant-modal.component';
import { UserRole } from '../../../../models/enums/UserRole';
import { Review } from '../../../../models/Review';
import { User } from '../../../../models/User';
import { ErrorService } from '../../../../services/error.service';
import { ReviewService } from '../../../../services/review.service';
import { ATTENDANT, USER } from '../../../../tokens/token';
import { DoctorsReviewsComponent } from './doctors-reviews/doctors-reviews.component';

@Component({
  selector: 'app-doctors-buttons',
  imports: [NgIf, SkyAlertModule, CommonModule, DoctorsReviewsComponent],
  templateUrl: './doctors-buttons.component.html',
  styleUrl: './doctors-buttons.component.css',
})
export class DoctorsButtonsComponent implements OnInit {
  @Input()
  public user?: User;

  @Input()
  public attendant?: User;

  public showModifiedAlert?: boolean;
  private instance = inject(SkyModalService);
  private reviewService = inject(ReviewService);
  private errorService = inject(ErrorService);
  public reviews: Review[] = [];

  async ngOnInit() {
    await this.getAttendantReviews();
  }

  async openCalendarModal(attendantTurn: User) {
    if (!this.user) {
      window.location.href = '/login';
      return;
    }
    if (this.user.role === UserRole.ATTENDANT) {
      return this.errorService.handleError(
        undefined,
        'No puede sacar turno siendo medico'
      );
    }
    const modalRef = this.instance.open(CalendarModalComponent, {
      providers: [
        {
          provide: ATTENDANT,
          useValue: attendantTurn,
        },
        {
          provide: USER,
          useValue: this.user,
        },
      ],
    });

    await modalRef.closed.toPromise();
  }

  async openManageAttendantModal(attendantTurn: User) {
    if (!this.user || this.user.role !== UserRole.ADMIN) {
      return this.errorService.handleError(
        undefined,
        'No tiene permiso para realizar estas acciones'
      );
    }
    const modalRef = this.instance.open(ManageAttendantModalComponent, {
      providers: [
        {
          provide: ATTENDANT,
          useValue: attendantTurn,
        },
        {
          provide: USER,
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
  }

  async getAttendantReviews() {
    try {
      if (!this.attendant?.id) {
        return this.errorService.handleError(
          undefined,
          'Faltan datos de usuario'
        );
      }
      this.reviews =
        (await this.reviewService.getAttendantReviewsTC(this.attendant?.id)) ||
        [];
    } catch (error) {
      return this.errorService.handleError(error, 'Error leyendo reseñas');
    }
  }
}
