import { Component, inject, OnInit } from '@angular/core';
import { SkyAlertModule } from '@skyux/indicators';
import { SkyNavbarModule } from '@skyux/navbar';
import { User } from '../../models/User';
import { UserRole } from '../../models/enums/UserRole';
import { UserStatus } from '../../models/enums/UserStatus';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [SkyAlertModule, SkyNavbarModule, SkyDropdownModule, NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  userService = inject(UserService);
  user: User = new User(
    '',
    '',
    '',
    '',
    '',
    UserRole.CLIENT,
    UserStatus.ACTIVE,
    ''
  );

  async ngOnInit() {
    this.user = await this.userService.getUserLogged();
  }
  protected onDropdownItemClick(buttonText: string): void {
    alert(buttonText + ' button clicked!');
  }
}
