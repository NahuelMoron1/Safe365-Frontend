import { Component, inject, Input } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { UserdataComponent } from '../../components/userdata/userdata.component';
import { Review } from '../../models/Review';
import { Turn } from '../../models/Turn';
import { User } from '../../models/User';
import { UserRole } from '../../models/enums/UserRole';
import { ErrorService } from '../../services/error.service';
import { ReviewService } from '../../services/review.service';
import { TurnService } from '../../services/turn.service';

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
    if (!this.user || !this.user.id) {
      return this.errorService.handleError(
        undefined,
        'No hay datos de usuario'
      );
    }

    try {
      if (this.user?.role === UserRole.ATTENDANT) {
        this.reviews = await this.reviewService.getAttendantReviewsTC(
          this.user.id
        );
      } else {
        this.reviews = await this.reviewService.getUserReviewsTC(this.user.id);
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
