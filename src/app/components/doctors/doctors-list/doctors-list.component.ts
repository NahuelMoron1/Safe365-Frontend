import { Component, inject, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { SkyCardModule, SkyFluidGridModule } from '@skyux/layout';

import { NgIf, NgFor } from '@angular/common';
import { UserRole } from '../../../models/enums/UserRole';
import { FormsModule } from '@angular/forms';
import { Socialwork } from '../../../models/Socialwork';
import { SocialworksService } from '../../../services/socialworks.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [SkyCardModule, SkyFluidGridModule, NgIf, NgFor, FormsModule],
  templateUrl: './doctors-list.component.html',
  styleUrl: './doctors-list.component.css',
})
export class DoctorsListComponent implements OnInit {
  @Input()
  public user?: User;

  public socialWorks?: Socialwork[];
  private socialworkService = inject(SocialworksService);
  private userService = inject(UserService);
  public activeAttendants?: User[];
  public socialwork?: string;
  public bffurl: string = environment.endpoint;

  async ngOnInit() {
    await this.searchAttendants();
    await this.getSocialworks();
  }

  async getSocialworks() {
    this.socialWorks = await this.socialworkService.getActiveSocialworksTC();
    if (this.socialWorks?.length) {
      const allSocialworks = new Socialwork('0', 'Todas', true);
      this.socialWorks.unshift(allSocialworks);
      this.socialwork = this.socialWorks[0].name;
    }
  }

  async searchAttendants() {
    if (this.user?.role === UserRole.ADMIN) {
      this.activeAttendants = await this.userService.getAllAttendantsTC();
    } else {
      this.activeAttendants = await this.userService.getActiveAttendantsTC();
    }
  }

  async changeSocialwork(event: Event | string) {
    const selectedValue =
      typeof event === 'string'
        ? event
        : (event.target as HTMLSelectElement).value;
    const selectedSocialwork = this.socialWorks?.find(
      (sw) => sw.name === selectedValue
    );
    if (selectedSocialwork) {
      this.socialwork = selectedSocialwork.name;
      if (selectedSocialwork.id === '0') {
        this.activeAttendants = await this.userService.getActiveAttendantsTC();
        return;
      }
      this.activeAttendants =
        await this.userService.getAttendantsBySocialworkTC(
          selectedSocialwork.id
        );
    }
  }
}
