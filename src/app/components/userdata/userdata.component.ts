import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Review } from '../../models/Review';
import { Turn } from '../../models/Turn';
import { User } from '../../models/User';
import { MyScheduleComponent } from '../my-schedule/my-schedule.component';
import { ReviewsInfoComponent } from '../reviews-info/reviews-info.component';
import { TurnsInformationComponent } from '../turns-information/turns-information.component';
import { ProfileSectionComponent } from './profile-section/profile-section.component';

@Component({
  selector: 'app-userdata',
  imports: [
    RouterModule,
    ProfileSectionComponent,
    NgIf,
    TurnsInformationComponent,
    ReviewsInfoComponent,
    MyScheduleComponent,
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
