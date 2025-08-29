import { Component, inject, Input } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { UserdataComponent } from '../../shared/components/userdata/userdata.component';
import { UserRole } from '../../shared/models/enums/UserRole';
import { Review } from '../../shared/models/Review';
import { Turn } from '../../shared/models/Turn';
import { User } from '../../shared/models/User';
import { ErrorService } from '../../shared/services/error.service';
import { ReviewService } from '../../shared/services/review.service';
import { TurnService } from '../../shared/services/turn.service';

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
