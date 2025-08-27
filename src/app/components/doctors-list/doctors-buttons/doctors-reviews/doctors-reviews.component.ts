import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { SkyModalService } from '@skyux/modals';
import { SeeFullReviewsModalComponent } from '../../../../modals/see-full-reviews-modal/see-full-reviews-modal.component';
import { Review } from '../../../../models/Review';
import { REVIEWS } from '../../../../tokens/token';

@Component({
  selector: 'app-doctors-reviews',
  imports: [CommonModule, NgIf],
  templateUrl: './doctors-reviews.component.html',
  styleUrl: './doctors-reviews.component.css',
})
export class DoctorsReviewsComponent implements OnInit {
  @Input()
  public reviews?: Review[];

  private instance = inject(SkyModalService);

  public average?: number;

  ngOnInit() {
    this.average = this.averageRating();
  }

  averageRating() {
    if (!this.reviews || this.reviews.length === 0) {
      return 0; // O `null` si preferís representar "sin calificaciones"
    }

    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / this.reviews.length;
  }

  starPercentage(): number {
    return (this.averageRating() / 5) * 100;
  }

  async openReviewsModal() {
    const modalRef = this.instance.open(SeeFullReviewsModalComponent, {
      providers: [
        {
          provide: REVIEWS,
          useValue: this.reviews,
        },
      ],
    });

    await modalRef.closed.toPromise();
  }
}
