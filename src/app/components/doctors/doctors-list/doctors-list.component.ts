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
import { SkyAlertModule } from '@skyux/indicators';
import { DoctorsHeadersComponent } from './doctors-headers/doctors-headers.component';
import { DoctorsSelectComponent } from './doctors-select/doctors-select.component';
import { DoctorsNotFoundComponent } from './doctors-not-found/doctors-not-found.component';
import { DoctorsButtonsComponent } from './doctors-buttons/doctors-buttons.component';
import { DoctorsInfoComponent } from './doctors-info/doctors-info.component';

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [
    SkyCardModule,
    SkyFluidGridModule,
    NgIf,
    NgFor,
    FormsModule,
    SkyAlertModule,
    DoctorsHeadersComponent,
    DoctorsSelectComponent,
    DoctorsNotFoundComponent,
    DoctorsButtonsComponent,
    DoctorsInfoComponent,
  ],
  templateUrl: './doctors-list.component.html',
  styleUrl: './doctors-list.component.css',
})
export class DoctorsListComponent implements OnInit {
  @Input()
  public user?: User;

  private socialworkService = inject(SocialworksService);
  private userService = inject(UserService);

  public socialWorks?: Socialwork[];
  public activeAttendants?: User[];

  public socialwork?: string;
  public bffurl: string = environment.endpoint;

  async ngOnInit() {
    await this.getSocialworks();
    await this.searchAttendants();
  }

  OnChanges() {
    this.userService.getBehaviorSubject().subscribe((users) => {
      this.activeAttendants = users;
    });
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
      await this.userService.getAllAttendantsTC();
    } else {
      await this.userService.getActiveAttendantsTC();
    }
    this.OnChanges();
  }
}
