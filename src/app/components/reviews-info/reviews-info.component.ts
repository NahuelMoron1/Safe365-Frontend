import { DatePipe, NgFor, NgIf } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { environment } from '../../environments/environment';
import { UserRole } from '../../models/enums/UserRole';
import { Review } from '../../models/Review';
import { User } from '../../models/User';
import { ErrorService } from '../../services/error.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-reviews-info',
  imports: [NgIf, NgFor, DatePipe],
  templateUrl: './reviews-info.component.html',
  styleUrl: './reviews-info.component.css',
})
export class ReviewsInfoComponent implements OnChanges {
  @Input()
  public user?: User;

  private reviewService = inject(ReviewService);
  private errorService = inject(ErrorService);

  public reviews?: Review[];
  public bffUrl: string = environment.endpoint;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user?.id) {
      this.getUserReviews();
    }
  }

  async getUserReviews() {
    if (!this.user || !this.user.id) {
      return this.errorService.handleError(
        undefined,
        'No hay datos de usuario'
      );
    }
    try {
      if (this.user.role !== UserRole.ATTENDANT) {
        this.reviews = await this.reviewService.getUserReviewsTC(this.user.id);
      } else {
        this.reviews = await this.reviewService.getAttendantReviewsTC(
          this.user.id
        );
        console.log(this.reviews);
      }
      return;
    } catch (error) {
      return this.errorService.handleError(error, 'Error leyendo reseñas');
    }
  }
}
