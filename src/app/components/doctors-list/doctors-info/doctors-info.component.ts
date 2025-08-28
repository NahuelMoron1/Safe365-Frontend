import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../../models/User';

@Component({
  selector: 'app-doctors-info',
  imports: [NgIf, NgFor],
  templateUrl: './doctors-info.component.html',
  styleUrl: './doctors-info.component.css',
})
export class DoctorsInfoComponent {
  @Input()
  public user?: User;

  @Input()
  public attendant?: User;

  private bffUrl?: string = environment.endpoint;

  returnProfileImage(imageUrl?: string) {
    if (!this.bffUrl || !imageUrl) {
      return 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';
    }
    return this.bffUrl + imageUrl;
  }

  checkSpan(index: number, attendant?: User) {
    if (attendant && attendant.AttendantXSocialworks) {
      return index < attendant.AttendantXSocialworks.length - 1;
    }
    return false;
  }
}
