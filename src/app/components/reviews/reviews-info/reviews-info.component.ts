import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { User } from '../../../models/User';
import { ReviewService } from '../../../services/review.service';
import { ErrorService } from '../../../services/error.service';
import { Review } from '../../../models/Review';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { environment } from '../../../environments/environment';

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
      this.reviews = await this.reviewService.getUserReviewsTC(this.user.id);
      return;
    } catch (error) {
      return this.errorService.handleError(error, 'Error leyendo reseñas');
    }
  }
}
