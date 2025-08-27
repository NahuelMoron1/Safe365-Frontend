import { Component, Input } from '@angular/core';
import { User } from '../../../models/User';
import { RouterModule } from '@angular/router';
import { Turn } from '../../../models/Turn';
import { Review } from '../../../models/Review';
import { ProfileSectionComponent } from './profile-section/profile-section.component';
import { NgIf } from '@angular/common';
import { TurnsInformationComponent } from '../../turns/turns-information/turns-information.component';
import { ReviewsInfoComponent } from '../../reviews/reviews-info/reviews-info.component';

@Component({
  selector: 'app-userdata',
  imports: [
    RouterModule,
    ProfileSectionComponent,
    NgIf,
    TurnsInformationComponent,
    ReviewsInfoComponent,
  ],
  templateUrl: './userdata.component.html',
  styleUrl: './userdata.component.css',
})
export class UserdataComponent {
  @Input()
  public user?: User;

  @Input()
  public turns?: Turn[];

  @Input()
  public reviews?: Review[];

  public activeSection = 'Mi cuenta';
}
