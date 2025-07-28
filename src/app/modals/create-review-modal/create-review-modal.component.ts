import { Component, inject, Inject, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { SkyModalInstance, SkyModalModule } from '@skyux/modals';
import { ErrorService } from '../../services/error.service';
import { UserRole } from '../../models/enums/UserRole';
import { ReviewService } from '../../services/review.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Review } from '../../models/Review';
import { UtilsService } from '../../services/utils.service';
import { SkyToastService, SkyToastType } from '@skyux/toast';

@Component({
  selector: 'app-create-review-modal',
  imports: [NgFor, SkyModalModule, FormsModule, NgIf],
  templateUrl: './create-review-modal.component.html',
  styleUrl: './create-review-modal.component.css',
})
export class CreateReviewModalComponent implements OnInit {
  private errorService = inject(ErrorService);
  private instance = inject(SkyModalInstance);
  private reviewService = inject(ReviewService);
  private toastSvc = inject(SkyToastService);

  constructor(
    @Inject('ATTENDANT') public attendant?: User,
    @Inject('USER') public user?: User,
    @Inject('REVIEW') public review?: Review
  ) {}

  public stars?: number;
  public comments?: string;
  public bffUrl?: string = environment.endpoint;
  public originalReview?: Review;

  ngOnInit(): void {
    this.originalReview = this.review;
    if (this.review) {
      this.stars = this.review.rating;
      this.comments = this.review.comment;
    }
  }

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

  isOriginalReview() {
    if (
      this.originalReview?.rating === this.stars &&
      this.originalReview?.comment === this.comments
    ) {
      return true;
    }
    return false;
  }

  modifyReview() {
    if (this.isOriginalReview()) {
      return this.instance.close('ok');
    }
  }

  async deleteReview() {
    if (
      !this.review ||
      !this.user ||
      this.user.role !== UserRole.CLIENT ||
      this.user.id !== this.review?.userID
    ) {
      return this.errorService.handleError(
        undefined,
        'No tiene permiso para eliminar'
      );
    }
    try {
      await this.reviewService
        .deleteAttendantReview(this.review.id!)
        .toPromise();

      this.instance.close('close');

      return UtilsService.openToast(
        this.toastSvc,
        'Reseña eliminada correctamente',
        SkyToastType.Success
      );
    } catch (error) {
      return this.errorService.handleError(error, 'Error eliminando reseña');
    }
  }

  closeModal() {
    this.instance.close('close');
  }
}
