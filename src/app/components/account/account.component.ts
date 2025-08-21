import { Component, inject, Input } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { User } from '../../models/User';
import { UserdataComponent } from './userdata/userdata.component';
import { Review } from '../../models/Review';
import { ErrorService } from '../../services/error.service';
import { ReviewService } from '../../services/review.service';
import { TurnService } from '../../services/turn.service';
import { Turn } from '../../models/Turn';
import { UserRole } from '../../models/enums/UserRole';

@Component({
  selector: 'app-account',
  imports: [NavBarComponent, UserdataComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  @Input()
  public user?: User;

  private errorService = inject(ErrorService);
  private reviewService = inject(ReviewService);
  private turnsService = inject(TurnService);

  public reviews?: Review[];
  public turns?: Turn[];

  async handleUser(user: any) {
    this.user = user;
    try {
      if (this.user?.role === UserRole.ATTENDANT) {
        this.reviews = await this.reviewService.getAttendantReviewsTC(
          this.user?.id!
        );
      } else {
        this.reviews = await this.reviewService.getUserReviewsTC(
          this.user?.id!
        );
      }

      this.turns = await this.turnsService.getAllUserTurnsTC();
    } catch (error) {
      return this.errorService.handleError(
        error,
        'Error leyendo datos de usuario'
      );
    }
  }
}
