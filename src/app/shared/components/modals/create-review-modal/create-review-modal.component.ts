import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SkyModalInstance, SkyModalModule } from '@skyux/modals';
import { SkyToastService, SkyToastType } from '@skyux/toast';
import { environment } from '../../../../environments/environment';
import { UserRole } from '../../../models/enums/UserRole';
import { Review } from '../../../models/Review';
import { ErrorService } from '../../../services/error.service';
import { ReviewService } from '../../../services/review.service';
import { UtilsService } from '../../../services/utils.service';
import { ATTENDANT, REVIEW, USER } from '../../../tokens/token';

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
  private router = inject(Router);

  public attendant? = inject(ATTENDANT);
  public user? = inject(USER);
  public review? = inject(REVIEW);

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

      if (!UtilsService.isValidInput(this.comments || '')) {
        return this.errorService.handleError(
          undefined,
          'No puede escribir caracteres especiales'
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

  async modifyReview() {
    try {
      if (this.isOriginalReview()) {
        return this.instance.close('ok');
      }
      if (
        !this.review ||
        !this.review.id ||
        !this.stars ||
        !this.review.attendantID
      ) {
        return this.errorService.handleError(
          undefined,
          'No todos los campos contienen un valor'
        );
      }

      const newReview: Review = new Review(
        this.review.userID,
        this.review.attendantID,
        this.stars,
        this.review.dateCreated,
        this.comments,
        this.review.id
      );

      await this.reviewService.modifyReview(newReview).toPromise();
      this.instance.close('close');

      return UtilsService.openToast(
        this.toastSvc,
        'Reseña modificada correctamente',
        SkyToastType.Success
      );
    } catch (error) {
      const fullUrl = `${window.location.origin}${this.router.url}`;
      const payload = {
        err: error,
        rawMessage: 'No se pudo modificar',
        userID: this.user?.id,
        url: fullUrl,
      };

      return this.errorService.handleError(
        error,
        'No se pudo modificar',
        payload
      );
    }
  }

  async deleteReview() {
    const affirm = confirm('Seguro que desea borrar esta reseña?');
    if (!affirm) {
      return;
    }
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
      const fullUrl = `${window.location.origin}${this.router.url}`;
      const payload = {
        err: error,
        rawMessage: 'Error eliminando reseña',
        userID: this.user?.id,
        url: fullUrl,
      };

      return this.errorService.handleError(
        error,
        'Error eliminando reseña',
        payload
      );
    }
  }

  closeModal() {
    this.instance.close('close');
  }
}
