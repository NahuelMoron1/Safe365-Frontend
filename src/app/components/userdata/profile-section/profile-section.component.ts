import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Review } from '../../../models/Review';
import { Turn } from '../../../models/Turn';
import { User } from '../../../models/User';

@Component({
  selector: 'app-profile-section',
  imports: [NgIf, RouterModule],
  templateUrl: './profile-section.component.html',
  styleUrl: './profile-section.component.css',
})
export class ProfileSectionComponent {
  @Input()
  public user?: User;

  @Input()
  public turns?: Turn[];

  @Input()
  public reviews?: Review[];

  public bffUrl: string = environment.endpoint;

  getAverageRating() {
    let averageRating = 0;
    if (!this.reviews) {
      return averageRating;
    }

    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);

    averageRating = total / this.reviews.length;
    return averageRating;
  }

  getTurns(type: string) {
    switch (type) {
      case 'scheduled':
        return (
          this.turns?.filter((turn) => turn.status === 'scheduled').length || 0
        );
      case 'completed':
        return (
          this.turns?.filter((turn) => turn.status === 'completed').length || 0
        );
      case 'canceled':
        return (
          this.turns?.filter((turn) => turn.status === 'canceled').length || 0
        );
      default:
        return 0;
    }
  }
}
