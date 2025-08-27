import { Component, Input } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { ReviewsInfoComponent } from '../../components/reviews-info/reviews-info.component';
import { User } from '../../models/User';

@Component({
  selector: 'app-reviews',
  imports: [NavBarComponent, ReviewsInfoComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent {
  @Input()
  public user?: User;

  handleUser(user: any) {
    this.user = user;
  }
}
