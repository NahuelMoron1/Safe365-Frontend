import { Component, inject, Inject } from '@angular/core';
import { User } from '../../models/User';
import { SkyModalInstance, SkyModalModule } from '@skyux/modals';
import { ErrorService } from '../../services/error.service';
import { UserRole } from '../../models/enums/UserRole';
import { ReviewService } from '../../services/review.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Review } from '../../models/Review';

@Component({
  selector: 'app-create-review-modal',
  imports: [NgFor, SkyModalModule, FormsModule, NgIf],
  templateUrl: './create-review-modal.component.html',
  styleUrl: './create-review-modal.component.css',
})
export class CreateReviewModalComponent {
  private errorService = inject(ErrorService);
  private instance = inject(SkyModalInstance);
  private reviewService = inject(ReviewService);

  constructor(
    @Inject('ATTENDANT') public attendant?: User,
    @Inject('USER') public user?: User,
    @Inject('REVIEW') public review?: Review
  ) {}

  public stars?: number;
  public comments?: string;
  public bffUrl?: string = environment.endpoint;

  async addReview() {
    try {
      if (!this.user?.id || !this.attendant?.id) {
        return this.errorService.handleError(
          undefined,
          'Faltan datos de usuario'
        );
      }
      if (this.user.role !== UserRole.CLIENT) {
        return this.errorService.handleError(
          undefined,
          'No puede agregar una reseña siendo médico o administrador'
        );
      }
      if (!this.stars) {
        return this.errorService.handleError(
          undefined,
          'No puede dejar el campo de estrellas vacío'
        );
      }
      const body = {
        attendantID: this.attendant.id,
        rating: this.stars,
        comment: this.comments,
      };
      await this.reviewService.setAttendantReview(body).toPromise();

      this.instance.close('ok');
    } catch (error: any) {
      this.instance.close(error.message);
    }
  }

  modifyReview() {}

  deleteReview() {}
}
